from flask import Flask, render_template

def page_not_found(error):
    return render_template('404.html'), 404

def internal_server_error(error):
    return render_template('500.html'), 500

def mysite_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/')
    def index():
        return render_template('home.html') 

    @app.route('/login/')
    def page_login():
        return render_template('/login/login.html')

    @app.route('/my-account/')
    def my_account():
        return render_template('/my-account/my-account.html')
    
    @app.route('/about/')
    def about():
        return render_template('/about/about.html')

    @app.route('/contact/')
    def contact():
        return render_template('/contact/contact.html')

    app.static_folder = 'static'

    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, internal_server_error)

    return app
