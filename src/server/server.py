import json

from flask import Flask, jsonify, request, redirect
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from util.crypto import decrypt
from util.server_setup import setup_server, get_users, User

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-qa-jwt-key' # Not best practice
jwt = JWTManager(app)

@app.route('/auth', methods = ['GET'])
@jwt_required()
def authenticated():
	curr_user = get_jwt_identity()

	return jsonify('authorised')

@app.route('/login', methods = ['POST'])
def login():
	username = request.json.get('username', None)
	password = request.json.get('password', None)
	if username == '' or password == '':
		return jsonify({'error': 'Missing Required fields'}), 401

	users = get_users()
	id_user = None
	for user in users:
		if user.username.lower() == username.lower() and decrypt(user.password_hash) == password:
			id_user = user
			break

	if id_user is None:
		return jsonify({'error': 'User does not exist'}), 401

	access_token = create_access_token(identity={username: username, user_id: id_user.user_id})

	return jsonify({'token': access_token})

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
