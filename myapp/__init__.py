from flask import Flask, render_template, request, jsonify
from google.auth import crypt
from google.auth import jwt
from datetime import datetime

def get_time():
    _day = datetime.now().strftime('%d')
    _month = datetime.now().strftime('%b')
    _year = datetime.now().strftime('%Y')
    _hour = datetime.now().strftime('%H')
    _minute = datetime.now().strftime('%M')
    _second = datetime.now().strftime('%S')
    return f'{_day}/{_month}/{_year} {_hour}:{_minute}:{_second}'

def get_requester_ip():
    _ip_address = request.remote_addr
    return _ip_address

def page_not_found(error):
    return render_template('/404/404.html'), 404

def internal_server_error(error):
    return render_template('/500/500.html'), 500

def mysite_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/')
    def index():
        return render_template('/home/home.html') 

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == "POST":
            datafromjs = request.form['mydata']
            decoded = jwt.decode(datafromjs, certs=None, verify=False)
            print(f"{get_requester_ip()} - - [{get_time()}] {decoded}")
        
        return render_template('/login/login.html')

    @app.route('/my-account')
    def my_account():
        return render_template('/my-account/my-account.html')
    
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
