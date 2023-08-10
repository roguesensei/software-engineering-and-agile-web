from util.crypto import encrypt

class User:
	def __init__(self, _username: str, _password: str, _role: int = 0):
		self.username = _username
		self.password_hash = encrypt(_password)
		self.role = _role

	username: str
	password_hash: bytes
	role: int