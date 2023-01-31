#!/usr/bin/env python3
"""Login system"""


from flask import Flask, render_template, request, g
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(user_id=None):
    """Retrieves a user"""
    if user_id is None:
        return None

    if users.get(user_id) is not None:
        return users.get(user_id)
    else:
        return None


@app.before_request
def before_request():
    user_id = request.args.get('login_as')
    if user_id is not None:
        user = get_user(user_id)
        g.user = user


@app.route('/', strict_slashes=False)
def hello_holberton():
    """returns hello holberton"""
    return render_template('5-index.html',
                           home_title="Welcome to Holberton",
                           home_header="Hello world",
                           user=g.user)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
