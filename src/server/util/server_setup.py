import sqlite3

from dal.user_dal import add_user, get_users
from models.user import User, UserRole
from util.server_config import server_config
from util.crypto import generate_key

def setup_server():
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	cur.execute(__create_user_table_sql)
	cur.close()

	users = get_users()
	if len(users) == 0:
		default_admin = User('admin', UserRole.ADMIN)
		default_admin.set_password('Admin123!')
		add_user(default_admin)

__create_user_table_sql = '''
CREATE TABLE IF NOT EXISTS user
(
	username VARCHAR(50) NOT NULL,
	password_hash BLOB NOT NULL,
	role INT NOT NULL DEFAULT(0)
);
'''