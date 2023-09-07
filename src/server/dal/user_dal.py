import sqlite3

from models.user import User, UserRole
from util.server_config import server_config

def get_users() -> list[User]:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	cur.execute(__get_sql)

	rows = cur.fetchall()
	con.close()

	users: list[User] = []
	for row in rows:
		user = User(row[1], UserRole(row[3]))
		user.user_id = row[0]
		user.password_hash = row[2]
		users.append(user)

	return users

def add_user(user: User) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	cur.execute(__add_sql, (user.username, user.password_hash, user.role.value))
	con.commit()
	cur.close()

__get_sql = '''
SELECT
	u.rowid,
	u.username,
	u.password_hash,
	u.role
FROM user u
'''

__add_sql = '''
INSERT INTO user 
(
	username, 
	password_hash,
	role
)
VALUES (?, ?, ?)
'''