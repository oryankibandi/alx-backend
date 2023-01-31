#!/usr/bin/env python3
"""Flask app"""

from flask import Flask, render_template, request
from flask_babel import Babel


def get_locale():
    """Determines best match language"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


app = Flask(__name__)
babel = Babel(app, locale_selector=get_locale)


class Config:
    """Config class"""
    LANGUAGES = ["en", "fr"]

    def __init__(self) -> None:
        babel.default_locale = 'en_US'
        babel.default_timezone = 'UTC'


app.config.from_object(Config)


@app.route('/', strict_slashes=False)
def hello_holberton():
    """returns hello holberton"""
    return render_template('3-index.html', home_title="Welcome to Holberton", home_header="Hello world")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
