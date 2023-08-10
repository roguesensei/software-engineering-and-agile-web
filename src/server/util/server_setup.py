import pymongo
import sqlite3

from dal.user_dal import add_user
from models.user import User
from util.server_config import server_config
from util.crypto import generate_key

def setup_server():
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()

	cur.execute(create_user_table_sql)
	cur.close()

	admin = User('admin', 'Admin123!', 3)
	add_user(admin)

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