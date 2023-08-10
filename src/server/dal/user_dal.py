import sqlite3

from models.user import User
from util.server_config import server_config

def get_users():

	pass

def add_user(user: User):
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	cur.execute(add_sql, (user.username, user.password_hash.decode(), user.role))
	con.commit()
	cur.close()

add_sql = '''
INSERT INTO user 
(
	username, 
	password_hash,
	role
)
VALUES (?, ?, ?)
'''