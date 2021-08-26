from enum import unique
from flask import Flask, render_template, request, session, url_for
from google.auth import crypt
from google.auth import jwt
from datetime import datetime
import sqlite3
import os.path
from pyasn1.type.univ import Null
import asyncio

from werkzeug.utils import redirect

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_KEY = 'IIWWC96ZE1K7WJB8LY8M8VQ80OC4A4884QJCH3KIL3Y5F19P03R13PYEPO9JOST91S72IJ6BMB7MGY2EYMB8HT72MRD0IBSBB6D33D6OFZ87J7EYEO6KXP9MX3MD8M1TSAGPS2TCXXOXJNBA71WKVOMGM5M41ZMI2BQZG5SUN2Y9RI3WW2O4EMNBGUM7MQEOQRF2ESRBQ85DYTXRK0QT04I7L4RXLJ3XFZHUS7MIWT0Z0ETRR8SAAX6IHJ73OO6O'
users_db_path = os.path.join(BASE_DIR, "users.db")

# Get Current Server Timing

def get_time():
    _day = datetime.now().strftime('%d')
    _month = datetime.now().strftime('%b')
    _year = datetime.now().strftime('%Y')
    _hour = datetime.now().strftime('%H')
    _minute = datetime.now().strftime('%M')
    _second = datetime.now().strftime('%S')
    return f'{_day}/{_month}/{_year} {_hour}:{_minute}:{_second}'

# Get User Ip Address

def get_requester_ip():
    _ip_address = request.remote_addr
    return _ip_address

# Error Code(s)

def page_not_found(error):
    return render_template('/404/404.html'), 404

def internal_server_error(error):
    return render_template('/500/500.html'), 500

#
# Decode JWT Data
#

def decode_JWT_data(data):
    decoded = jwt.decode(data, certs=None, verify=False)
    
    _sub = decoded['sub']
    checkUserInfo(decoded)
    return decoded

#
# Get the column info from a decoded JWT Token
#

def getColumnInfo(data):
    iss = data['iss'] 
    sub = data['sub']
    hd = data['hd']
    email = data['email']
    email_verified = data['email_verified']
    name = data['name']
    given_name = data['given_name']
    family_name = data['family_name']
    return iss, sub, hd, email, email_verified, name, given_name, family_name

#
# Check if User already has Data in Database ; If No Data, create new entry and upload to Database
#

def checkUserInfo(data):
    _iss, _sub, _hd, _email, _email_verified, _name, _given_name, _family_name = getColumnInfo(data)
    sub_data = ''

    try:
        sqliteConnection = sqlite3.connect(users_db_path)
        cursor = sqliteConnection.cursor()
        print("[checkUserInfo] Connected to Database")

        sql_select_query = """SELECT * FROM Users WHERE sub = ?;"""

        result_data_cursor_object = cursor.execute(sql_select_query, (_sub,))

        for row in result_data_cursor_object:
            # This will only get a sub IF there is a result
            sub_data = row[1]

        if (sub_data == _sub):
            # Since User Info exists
            print(f"{get_requester_ip()} - - [{get_time()}] < [DATABASE --- USERS] [{_name}] > User Info Already Exists")
        else:
            # Insert User Info
            sql_insert_query = """INSERT INTO Users
                                    (iss, sub, hd, email, email_verified, name, given_name, family_name)
                                    VALUES
                                    (?, ?, ?, ?, ?, ?, ?, ?);"""
            data_tuple = (_iss, _sub, _hd, _email, _email_verified, _name, _given_name, _family_name)
            cursor.execute(sql_insert_query, data_tuple)
            print(f"{get_requester_ip()} - - [{get_time()}] < [DATABASE --- USERS] [{_name}] > User Info Updated")

        sqliteConnection.commit()
        cursor.close()
        
    except sqlite3.Error as error:
        print("[checkUserInfo] Error while connecting to sqlite3", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("[checkUserInfo] Connection to Database closed")

# Retrieve User Info for My Account Page

def retrieveUserInfo(sub_data):
    _sub = sub_data

    try:
        sqliteConnection = sqlite3.connect(users_db_path)
        cursor = sqliteConnection.cursor()
        print("[retrieveUserInfo] Connected to Database")

        sql_select_query = """SELECT * FROM Users WHERE sub = ?;"""

        result_data_cursor_object = cursor.execute(sql_select_query, (_sub,))

        _name = ''
        temp = []
        for row in result_data_cursor_object:
            for i in range(len(row)):
                temp.append(row[i])
                #print(temp)
            if temp:
                _name = temp[-3]
        
        sqliteConnection.commit()
        cursor.close()
        print(f"{get_requester_ip()} - - [{get_time()}] < [DATABASE --- USERS] [{_name}] > Row Info Retrieved")
        return temp
    
    except sqlite3.Error as error:
        print("[retrieveUserInfo] Error while connecting to sqlite3", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("[retrieveUserInfo] Connection to Database closed")

# Delete User Info for My Account Page

def deleteUserInfo(sub_data):
    _sub = sub_data

    try:
        sqliteConnection = sqlite3.connect(users_db_path)
        cursor = sqliteConnection.cursor()
        print("[deleteUserInfo] Connected to Database")

        sql_delete_query = """DELETE FROM Users WHERE sub = ?;"""

        result_data_cursor_object = cursor.execute(sql_delete_query, (_sub,))

        sqliteConnection.commit()
        cursor.close()
        print(f"{get_requester_ip()} - - [{get_time()}] < [DATABASE --- USERS] > User Info Deleted")
    
    except sqlite3.Error as error:
        print("[deleteUserInfo] Error while connecting to sqlite3", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("[deleteUserInfo] Connection to Database closed")
        
# Update session status

#
# App Configuration
#

def mysite_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(__name__)
 
    @app.route('/')
    def index():
        if 'session_id' in session:
            session_id = session['session_id']
            #print(f'Logged in as {session_id}')

        return render_template('/home/home.html')

    @app.route('/login', methods=['GET', 'POST'])
    async def login():
        if request.method == "POST":
            if not session:
                datafromjs = request.form['mydata']
                decoded_JWT_data = decode_JWT_data(datafromjs)
                session['session_id'] = decoded_JWT_data['sub']
                #print(f"{get_requester_ip()} - - [{get_time()}] {decoded_JWT_data}")
                return redirect('/menu')
        else:
            if session:
                return redirect('/menu')
            
        return render_template('/login/login.html')

    @app.route('/my-account', methods=['GET', 'POST'])
    async def my_account():
        # Request to delete data
        if request.method == "POST":
            # Check if user has a session
            if session:
                # If user has a session, get the session_id, aka the value of 'sub'
                uniqueSessionID = session['session_id']
                # Submit the value of 'sub' to deleteUserInfo to delete data
                deleteUserInfo(uniqueSessionID)
                session.clear()
            return redirect('/login')   
        else:
            if session:
                uniqueSessionID = session['session_id']
                row = retrieveUserInfo(uniqueSessionID)
            else:
                return redirect('/login')
        
        return render_template('/my-account/my-account.html', data=row)

    @app.route('/menu')
    async def menu():
        if request.method == "POST":
            if session:
                uniqueSessionID = session['session_id']
        else:
            if not session:
                return redirect('/login')

        return render_template('/menu/menu.html')

    @app.route('/about')
    def about():
        return render_template('/about/about.html')

    @app.route('/contact')
    def contact():
        return render_template('/contact/contact.html')

    app.static_folder = 'static'

    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, internal_server_error)

    return app