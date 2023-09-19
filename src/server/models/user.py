from util.crypto import encrypt

class User:
	def __init__(self, _username: str, _role: int = 0):
		self.user_id = 0
		self.username = _username
		self.role = _role

	def set_password(self, password: str):
		self.password_hash = encrypt(password)

	user_id: int
	username: str
	password_hash: bytes
	role: int