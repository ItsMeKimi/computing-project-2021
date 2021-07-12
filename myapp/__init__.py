from flask import Flask, render_template

def mysite_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/')
    def index():
        return render_template('main.html')

    @app.route('/')
    def page_login():
        return render_template('/login/index.html')

    @app.errorhandler(404)
    def not_found(error):
        return render_template('404.html'), 404

    return app
