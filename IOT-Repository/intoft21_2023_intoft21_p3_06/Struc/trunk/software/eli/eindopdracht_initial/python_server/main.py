from flask import Flask, jsonify, abort, make_response, request, url_for, g
from sqlite3 import dbapi2 as sqlite3

# Run with ../virtEnv/bin/python3 ./main.py
# in folder python_server

app = Flask(__name__)

@app.route('/', methods=['GET'])
def getRoot():
    return "TEST"

@app.route('/data', methods=['POST'])
def postData():
    return "Hello, World! POST"


@app.route('/statistics',methods=['GET'])
def getStats():
    return "Hello, World! GET"


@app.route('/statistics',methods=['DELETE'])
def delStats():
    return "Hello, World! DELETE"

"""DATABASE"""

def get_db():
    """for the current application context."""
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect('./todo/todo.db')
    rv.row_factory = sqlite3.Row
    return rv


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()




if __name__ == '__main__':
    app.run(debug=True)
    
    