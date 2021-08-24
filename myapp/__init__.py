from flask import Flask, render_template, request, jsonify
from google.auth import crypt
from google.auth import jwt
from datetime import datetime
import sqlite3
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
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
# Create unique ID based off JWT "sub" for cookie system
#

def create_unique_id(decoded_data):

    return

#
# Decode JWT Data
#

def decode_JWT_data(data):
    decoded = jwt.decode(data, certs=None, verify=False)
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
        print("Connected to Database")

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
        print("Error while connecting to sqlite3", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("Connection to Database closed")

#
# App Configuration
#

def mysite_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(__name__)

    @app.route('/')
    def index():
        return render_template('/home/home.html') 

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == "POST":
            datafromjs = request.form['mydata']
            decoded_JWT_data = decode_JWT_data(datafromjs)
            #print(f"{get_requester_ip()} - - [{get_time()}] {decoded_JWT_data}")
        
        return render_template('/login/login.html')

    @app.route('/my-account')
    def my_account():
        theData = [""]

        return render_template('/my-account/my-account.html', data=theData)
    
    @app.route('/about')
    def about():
        return render_template('/about/about.html')

    @app.route('/contact')
    def contact():
        return render_template('/contact/contact.html')

    @app.route('/menu')
    def menu():
        return render_template('/menu/menu.html')

    app.static_folder = 'static'

    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, internal_server_error)

    return app