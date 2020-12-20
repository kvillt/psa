"""
Backend API for RSA

Setup:
 Virtual env, in api folder:
    $ python3 -m venv env
    $ source env/bin/activate
    $ pip install -r requirements.txt

Run:
    $ python api.py

Test:
    $ curl -i -H "Content-Type: application/json" -X POST -d '{"A":[1,2,3,4,5], "B":[2,3,5,6,7]}' http://localhost:5000/api/post_data
"""
import flask
import numpy as np
from stat_calculator import fisher


app = flask.Flask(__name__)
app.config["DEBUG"] = True


ret = {
    'fisher': {}
}

@app.route('/', methods=['GET'])
def home():
    return "<h1>PSA - API</h1>"

@app.route('/api/get_results', methods=['GET'])
def get_results():
    return flask.jsonify(ret), 200

@app.route('/api/post_data', methods=['POST'])
def api_post():
    print(flask.request.json)
    if not flask.request.json or not 'A' in flask.request.json or not 'B' in flask.request.json:
        abort(400)
    
    A = np.array(flask.request.json['A']).astype(np.float)
    B = np.array(flask.request.json['B']).astype(np.float)

    p, matrix = fisher(A, B)
    ret['fisher']['matrix'] = matrix
    ret['fisher']['p'] = p

    return flask.jsonify(ret), 201

@app.errorhandler(404)
def not_found(error):
    return flask.make_response(flask.jsonify({'error': 'Not found'}), 404)

app.run()