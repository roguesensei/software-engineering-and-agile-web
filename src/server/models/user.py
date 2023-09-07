from enum import Enum
from util.crypto import encrypt

class UserRole(Enum):
	GUEST = 0,
	SUPERVISOR = 1,
	ADMIN = 2

class User:
	def __init__(self, _username: str, _role: UserRole = UserRole.GUEST):
		self.user_id = 0
		self.username = _username
		self.role = _role

	def set_password(self, password: str):
		self.password_hash = encrypt(password)

	user_id: int
	username: str
	password_hash: bytes
	role: UserRole