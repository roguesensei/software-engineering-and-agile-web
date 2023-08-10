from cryptography.fernet import Fernet
from util.server_config import server_config

def generate_key() -> None:
	key = Fernet.generate_key()

	with open('.secret.key', 'wb') as f:
		f.write(key)

def load_key() -> bytes:
	return open('.secret.key', 'rb').read()

def encrypt(msg: str) -> bytes:
	key = load_key()

	return Fernet(key).encrypt(msg.encode())

def decrypt(tok: bytes) -> str:
	key = load_key()

	return Fernet(key).decrypt(tok).decode()