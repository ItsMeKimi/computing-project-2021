from flask.templating import render_template
from myapp import mysite_app
from flask_assets import Environment, Bundle

app = mysite_app()

assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('/sass/index.scss', filters='pyscss', output='all.css')

assets.config['SECRET_KEY'] = 'secret!'

assets.config['PYSCSS_LOAD_PATHS'] = assets.load_path
assets.config['PYSCSS_STATIC_URL'] = assets.url
assets.config['PYSCSS_STATIC_ROOT'] = assets.directory
assets.config['PYSCSS_ASSETS_URL'] = assets.url
assets.config['PYSCSS_ASSETS_ROOT'] = assets.directory

assets.register('scss_all', scss)

if __name__ == "__main__":
	app.run(debug=True)