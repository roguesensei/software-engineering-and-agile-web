import sqlite3

from datetime import datetime
from models.enrolment import Enrolment
from util.server_config import server_config

def get_enrolments() -> list[Enrolment]:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	cur.execute(__get_sql)

	rows = cur.fetchall()
	con.close()

	enrolments: list[Enrolment] = []
	for row in rows:
		enrolment = Enrolment()
		enrolment.enrolment_id = row[0]
		enrolment.course_id = row[1]
		enrolment.user_id = row[2]
		enrolment.course_date = row[3]

		enrolments.append(enrolment)
	return enrolments

def add_enrolment(enrolment: Enrolment) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	
	cur.execute(__add_sql, (enrolment.course_id, enrolment.user_id, enrolment.course_date))
	con.commit()
	cur.close()

def edit_enrolment(enrolment: Enrolment) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	
	cur.execute(__edit_sql, (enrolment.course_id, enrolment.user_id, enrolment.course_date, enrolment.enrolment_id))
	con.commit()
	cur.close()

def delete_enrolment(enrolment_id: int) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	
	cur.execute(__delete_sql, str(enrolment_id)) # Cast to string to prevent exception
	con.commit()
	cur.close()


__get_sql = '''
SELECT
	e.enrolment_id,
	e.course_id,
	e.user_id,
	e.course_date
FROM enrolment e
'''

__add_sql = '''
INSERT INTO enrolment (course_id, user_id, course_date)
VALUES (?, ?, ?)
'''

__edit_sql = '''
UPDATE enrolment
SET
	course_id = ?,
	user_id = ?,
	course_date = ?
WHERE enrolment_id = ?
'''

__delete_sql = '''
DELETE FROM enrolment
WHERE enrolment_id = ?
'''