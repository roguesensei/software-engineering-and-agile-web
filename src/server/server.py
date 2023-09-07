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
		print('Missing fields')
		return jsonify({'error': 'Missing Required fields'}), 401

	id_user = None
	try:
		users = get_users()
		for user in users:
			print(decrypt(user.password_hash))
			if user.username.lower() == username.lower() and decrypt(user.password_hash) == password:
				id_user = user
				break
	except Exception as e:
		print('Something went horribly wrong', e)
		return jsonify({'error': 'Internal server error'}), 500

	if id_user is None:
		print('User not found')
		return jsonify({'error': 'Invalid username or password'}), 401

	access_token = create_access_token(identity=id_user.user_id)

	return jsonify({'token': access_token})


@app.route('/getUsers', methods=['GET'])
@jwt_required()
def load_users():
	try:
		users = get_users()
		arr = []

		for user in users:
			arr.append({
				'userId': user.user_id,
				'userName': user.username,
				'role': user.role.value
			})

		return jsonify(arr)
	except Exception as e:
		print(e)
		return jsonify('Internal server error'), 500

if __name__ == '__main__':
	setup_server()
	app.run(debug = True)
