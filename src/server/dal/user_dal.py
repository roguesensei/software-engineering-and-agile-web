import sqlite3

from models.user import User, UserRole
from util.server_config import server_config

def get_users() -> list[User]:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	cur.execute(get_sql)

	rows = cur.fetchall()
	con.close()

	users: list[User] = []
	for row in rows:
		user = User(row[0], UserRole(row[2]))
		user.password_hash = row[1]
		users.append(user)

	return users

def add_user(user: User) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	cur.execute(add_sql, (user.username, user.password_hash.decode(), user.role.value))
	con.commit()
	cur.close()

get_sql = '''
SELECT
	u.username,
	u.password_hash,
	u.role
FROM user u
'''

add_sql = '''
INSERT INTO user 
(
	username, 
	password_hash,
	role
)
VALUES (?, ?, ?)
'''