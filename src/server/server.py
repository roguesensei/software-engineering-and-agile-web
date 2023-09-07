import json

from flask import Flask, jsonify, request, redirect
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from util.server_setup import setup_server

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-qa-jwt-key' # Not best practice
jwt = JWTManager(app)

@app.route('/auth', methods = ['GET'])
@jwt_required()
def authenticated():
	curr_user = get_jwt_identity()
	print(curr_user)
	return jsonify('authorised')

@app.route('/login', methods = ['POST'])
def login():
	username = request.json.get('username', None)
	password = request.json.get('password', None)
	if username == '' or password == '':
		return jsonify({'error': 'Missing Required fields'}), 401

	access_token = create_access_token(identity=username)

	return jsonify({'token': access_token, 'user_id': 0})

# Test route
# @app.route('/test', methods = ['GET', 'POST'])
# def test():
# 	match request.method:
# 		case 'GET':
# 			return ['One', 'Two', 'Three']
# 		case 'POST':
# 			data = json.loads(request.data)
# 			print(data['data'])
# 			return jsonify(success=True)
# 		case _:
# 			raise Exception('Unsupported Http verb')


if __name__ == '__main__':
	setup_server()
	app.run(debug = True)
