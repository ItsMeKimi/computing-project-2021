from flask import Flask
from flask.templating import render_template
from myapp import mysite_app

app = mysite_app()

if __name__ == "__main__":
	app.run(debug=True)