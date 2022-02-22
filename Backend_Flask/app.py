from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/members')
def members():
    return {'members':['m1','m2', 'm4','m3']}


if __name__ == '__main__':
    app.run()
