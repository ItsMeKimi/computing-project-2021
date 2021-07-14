from flask.templating import render_template
from myapp import mysite_app

app = mysite_app()

if __name__ == "__main__":
	app.run(debug=True)

@app.errorhandler(404)
def not_found(error):
	return render_template('404.html'), 404