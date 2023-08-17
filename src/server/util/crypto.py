import os

from cryptography.fernet import Fernet
from util.server_config import server_config

def generate_key() -> None:
	key = Fernet.generate_key()

	with open(server_config['secret_key_file_path'], 'wb') as f:
		f.write(key)

def load_key() -> bytes:
	secret_key = server_config['secret_key_file_path']
	if not os.path.exists(secret_key):
		generate_key()

	with open(secret_key, 'rb') as f:
		return f.read()

def encrypt(msg: str) -> bytes:
	key = load_key()

	return Fernet(key).encrypt(msg.encode())

def decrypt(tok: bytes) -> str:
	key = load_key()

	return Fernet(key).decrypt(tok).decode()