from flask import Flask
from flask.templating import render_template
from myapp import mysite_app
import sass
import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

app = mysite_app()

sass.compile(dirname=('myapp/static/sass', 'myapp/static/css'), output_style='compressed')

if __name__ == "__main__":
	app.run(debug=True)