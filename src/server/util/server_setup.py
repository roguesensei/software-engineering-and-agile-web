import sqlite3

from dal.user_dal import add_user, get_users
from models.user import User, UserRole
from util.server_config import server_config
from util.crypto import generate_key

def setup_server():
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	# Create tables if they do not exist
	cur.execute(__create_user_table_sql)
	cur.execute(__create_course_table_sql)
	cur.execute(__create_enrolment_table_sql)
	cur.close()

	# Create a default admin user if no users exist
	users = get_users()
	if len(users) == 0:
		default_admin = User('Admin', UserRole.ADMIN)
		default_admin.set_password('Admin123!')
		add_user(default_admin)

__create_user_table_sql = '''
CREATE TABLE IF NOT EXISTS user
(
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	username VARCHAR(50) NOT NULL,
	password_hash BLOB NOT NULL,
	role INTEGER NOT NULL DEFAULT(0)
)
'''

__create_course_table_sql = '''
CREATE TABLE IF NOT EXISTS course
(
	course_id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(200) NOT NULL,
	description VARCHAR(500) NULL,
	instructor_id INTEGER NOT NULL
);
'''

__create_enrolment_table_sql = '''
CREATE TABLE IF NOT EXISTS enrolment
(
	enrolment_id INTEGER PRIMARY KEY AUTOINCREMENT,
	course_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	course_date DATETIME NOT NULL
);
'''