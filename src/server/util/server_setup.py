import pymongo

from util.server_config import server_config

def setup_server():
	client = pymongo.MongoClient(server_config['db_config']['connection_string'])
	print('Databases:', client.list_database_names())

	db = client[server_config['db_config']['db_name']]
	print('Collections:', db.list_collection_names())

	if (len(db.list_collection_names()) == 0):
		tbl = db['test']
		tbl.insert_many(server_config['default_users'])
	
	for x in db['test'].find():
		print(x)


