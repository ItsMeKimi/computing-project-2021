from flask import Flask, render_template, request, jsonify
from google.auth import crypt
from google.auth import jwt
from datetime import datetime
import sqlite3
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
users_db_path = os.path.join(BASE_DIR, "users.db")

#
#
# Get Current Server Timing
#
#

def get_time():
    _day = datetime.now().strftime('%d')
    _month = datetime.now().strftime('%b')
    _year = datetime.now().strftime('%Y')
    _hour = datetime.now().strftime('%H')
    _minute = datetime.now().strftime('%M')
    _second = datetime.now().strftime('%S')
    return f'{_day}/{_month}/{_year} {_hour}:{_minute}:{_second}'

#
#
# Get User Ip Address
#
#

def get_requester_ip():
    _ip_address = request.remote_addr
    return _ip_address

#
#
# Error Code(s)
#
#

def page_not_found(error):
    return render_template('/404/404.html'), 404

def internal_server_error(error):
    return render_template('/500/500.html'), 500

#
#
# Create unique ID based off JWT "sub" for cookie system
#
#

def create_unique_id(decoded_data):

    return

#
#
# Decode JWT Data
#
#

def decode_JWT_data(data):
    decoded = jwt.decode(data, certs=None, verify=False)
    insertUserInfo(decoded)
    return decoded

#
#
# Connect to Database
#
#


#
#
# Send Data to Database
#
#

def insertUserInfo(data):
    _iss = data['iss'] 
    _sub = data['sub']
    _hd = data['hd']
    _email = data['email']
    _email_verified = data['email_verified']
    _name = data['name']
    _given_name = data['given_name']
    _family_name = data['family_name']
    
    try:
        sqliteConnection = sqlite3.connect(users_db_path)
        cursor = sqliteConnection.cursor()
        print("Connected to Database")

        sql_insert_query = """INSERT INTO Users
                                (iss, sub, hd, email, email_verified, name, given_name, family_name)
                                VALUES
                                (?, ?, ?, ?, ?, ?, ?, ?);"""
        data_tuple = (_iss, _sub, _hd, _email, _email_verified, _name, _given_name, _family_name)
        cursor.execute(sql_insert_query, data_tuple)
        sqliteConnection.commit()
        print(f"{get_requester_ip()} - - [{get_time()}] < [DATABASE --- USERS] [{_name}] > Record Updated Successfully")
        cursor.close()

    except sqlite3.Error as error:
        print("Error while connecting to sqlite3", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("Connection to Database closed")

#
#
# Get Database
#
#

#
#
# App Configuration
#
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
            print(f"{get_requester_ip()} - - [{get_time()}] {decoded_JWT_data}")
        
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