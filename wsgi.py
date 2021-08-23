from flask import Flask
from flask.templating import render_template
from myapp import mysite_app
import sass
from flask_sqlalchemy import SQLAlchemy

myapp = mysite_app()

sass.compile(dirname=('myapp/static/sass', 'myapp/static/css'), output_style='compressed')

if __name__ == "__main__":
	myapp.run(debug=True)