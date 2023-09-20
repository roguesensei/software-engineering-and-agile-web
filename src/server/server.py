import json

from flask import Flask, jsonify, request, redirect
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from dal.course_dal import Course, get_courses, add_course, edit_course, delete_course
from dal.enrolment_dal import Enrolment, get_enrolments, add_enrolment, edit_enrolment, delete_enrolment
from dal.user_dal import User, get_users, add_user, update_user, delete_user
from util.crypto import decrypt
from util.server_setup import setup_server

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-qa-jwt-key' # Not best practice
jwt = JWTManager(app)

# Core routes
@app.route('/getCurrentUser', methods = ['GET'])
@jwt_required()
def get_current_user():
	curr_user = get_jwt_identity()

	return jsonify(curr_user)

@app.route('/login', methods = ['POST'])
def login():
	username = request.json.get('username', None)
	password = request.json.get('password', None)
	if username == '' or password == '':
		return jsonify({'error': 'Missing Required fields'}), 401

	id_user = None
	try:
		users = get_users()
		for user in users:
			if user.username.lower() == username.lower() and decrypt(user.password_hash) == password:
				id_user = user
				break
	except Exception as e:
		print('Something went wrong', e)
		return jsonify({'error': 'Internal server error'}), 500

	if id_user is None:
		return jsonify({'error': 'Invalid username or password'}), 401

	access_token = create_access_token(identity={'username': id_user.username, 'role': id_user.role})

	return jsonify({'token': access_token})

@app.route('/register', methods = ['POST'])
def register():
	username = request.json.get('username', None)
	password = request.json.get('password', None)
	if username == '' or password == '':
		return jsonify({'error': 'Missing Required fields'}), 401
	
	# Check user with given username doesn't already exist
	id_user = None
	try:
		users = get_users()
		for user in users:
			if user.username.lower() == username.lower():
				id_user = user
				break
	except Exception as e:
		print('Something went wrong', e)
		return jsonify({'error': 'Internal server error'}), 500
	
	if id_user is not None:
		return jsonify({'error': 'User with that username already exists'}), 401
	
	new_user = User(username)
	new_user.set_password(password)

	# Add new user
	try:
		add_user(new_user)
		access_token = create_access_token(identity={'username': new_user.username, 'role': new_user.role})

		return jsonify({'token': access_token})
	except Exception as e:
		print(e)
		return jsonify({'error': 'Could not register the user'}), 500



# User routes
@app.route('/user/get', methods=['GET'])
@jwt_required()
def user_get():
	try:
		users = get_users()
		arr = []

		for user in users:
			arr.append({
				'userId': user.user_id,
				'username': user.username,
				'role': user.role
			})

		return jsonify(arr)
	except Exception as e:
		print(e)
		return jsonify('Internal server error'), 500

@app.route('/user/update', methods=['POST'])
@jwt_required()
def user_update():
	body = request.json
	user_id = body.get('userId', None)
	role = body.get('role', None)

	update_user(user_id, role)
	return jsonify(True), 200

@app.route('/user/delete', methods=['POST'])
@jwt_required()
def user_delete():
	body = request.json
	user_id = body.get('userId', None)

	delete_user(user_id)
	return jsonify(True), 200

# Course routes
@app.route('/course/get', methods=['GET'])
@jwt_required()
def course_get():
	try:
		courses = get_courses()
		arr = []

		for course in courses:
			arr.append({
				'courseId': course.course_id,
				'name': course.name,
				'instructorId': course.instructor_id,
				'description': course.description
			})

		return jsonify(arr), 200
	except Exception as e:
		print(e)
		return jsonify('Internal server error'), 500

@app.route('/course/add', methods=['POST'])
@jwt_required()
def course_add():
	body = request.json
	course = Course()
	course.name = body.get('name', None)
	course.description = body.get('description', None)
	course.instructor_id = body.get('instructorId', None)

	add_course(course)
	return jsonify(True), 200

@app.route('/course/edit', methods=['POST'])
@jwt_required()
def course_edit():
	body = request.json
	course = Course()
	course.course_id = body.get('courseId')
	course.name = body.get('name', None)
	course.description = body.get('description', None)
	course.instructor_id = body.get('instructorId', None)

	edit_course(course)
	return jsonify(True), 200

@app.route('/course/delete', methods=['POST'])
@jwt_required()
def course_delete():
	course_id = request.json.get('courseId')

	delete_course(course_id)
	return jsonify(True), 200

# Enrolment routes
@app.route('/enrolment/get', methods=['GET'])
@jwt_required()
def enrolment_get():
	try:
		enrolments = get_enrolments()
		arr = []

		for enrolment in enrolments:
			arr.append({
				'enrolmentId': enrolment.enrolment_id,
				'courseId': enrolment.course_id,
				'userId': enrolment.user_id,
				'courseDate': enrolment.course_date
			})

		return jsonify(arr), 200
	except Exception as e:
		print(e)
		return jsonify('Internal server error'), 500

@app.route('/enrolment/add', methods=['POST'])
@jwt_required()
def enrolment_add():
	body = request.json
	enrolment = Enrolment()
	enrolment.course_id = body.get('courseId', None)
	enrolment.user_id = body.get('userId', None)
	enrolment.course_date = body.get('courseDate', None)

	add_enrolment(enrolment)
	return jsonify(True), 200

@app.route('/enrolment/update', methods=['POST'])
@jwt_required()
def enrolment_update():
	body = request.json
	enrolment = Enrolment()
	enrolment.enrolment_id = body.get('enrolmentId', None)
	enrolment.course_id = body.get('courseId', None)
	enrolment.user_id = body.get('userId', None)
	enrolment.course_date = body.get('courseDate', None)

	edit_enrolment(enrolment)
	return jsonify(True), 200

@app.route('/enrolment/delete', methods=['POST'])
@jwt_required()
def enrolment_delete():
	enrolment_id = request.json.get('enrolmentId')

	delete_enrolment(enrolment_id)
	return jsonify(True), 200

# Main
if __name__ == '__main__':
	setup_server()
	app.run(debug = True)
