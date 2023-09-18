import json

from flask import Flask, jsonify, request, redirect
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from dal.course_dal import Course, get_courses, add_course, edit_course, delete_course
from dal.enrolment_dal import Enrolment, get_enrolments
from dal.user_dal import get_users
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

	access_token = create_access_token(identity={'user_id': id_user.user_id, 'username': id_user.username, 'role': id_user.role.value})

	return jsonify({'token': access_token})

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
				'role': user.role.value
			})

		return jsonify(arr)
	except Exception as e:
		print(e)
		return jsonify('Internal server error'), 500

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

# Main
if __name__ == '__main__':
	setup_server()
	app.run(debug = True)
