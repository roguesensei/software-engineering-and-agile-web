import pymongo

from util.server_config import server_config

def get_users():
	client = pymongo.MongoClient(server_config['db_config']['connection_string'])
	db = client[server_config['db_config']['db_name']]


