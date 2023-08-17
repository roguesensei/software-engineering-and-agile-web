import sqlite3

from dal.user_dal import add_user, get_users
from models.user import User, UserRole
from util.server_config import server_config
from util.crypto import generate_key

def setup_server():
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	cur.execute(create_user_table_sql)
	cur.close()

	users = get_users()
	if len(users) == 0:
		default_admin = User('admin', UserRole.ADMIN)
		default_admin.set_password('Admin123!')
		add_user(default_admin)

	# client = pymongo.MongoClient(server_config['db_config']['connection_string'])
	# db = client[server_config['db_config']['db_name']]

	# if (len(db.list_collection_names()) == 0):
	# 	tbl = db['test']
	# 	tbl.insert_many(server_config['default_users'])

create_user_table_sql = '''
CREATE TABLE IF NOT EXISTS user
(
	username VARCHAR(50) NOT NULL,
	password_hash TEXT NOT NULL,
	role INT NOT NULL DEFAULT(0)
);
'''