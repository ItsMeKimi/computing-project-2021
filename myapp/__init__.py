from flask import Flask, render_template

def mysite_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/')
    def index():
        return render_template('home.html') 

    @app.route('/login/')
    def page_login():
        return render_template('/login/index.html')

    @app.route('/my-account/')
    def my_account():
        return render_template('/my-account/my-account.html')
    
    @app.route('/about/')
    def about():
        return render_template('/about/about.html')

    @app.route('/contact/')
    def contact():
        return render_template('/contact/contact.html')

    @app.errorhandler(404)
    def not_found(error):
        return render_template('404.html'), 404

    return app
