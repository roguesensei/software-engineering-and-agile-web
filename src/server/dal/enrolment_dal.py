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
		enrolment.course_date = datetime(row[3])

		enrolments.append(enrolment)
	return enrolments

def add_enrolment(enrolment: Enrolment) -> None:
	pass

def edit_enrolment(enrolment: Enrolment) -> None:
	pass

def delete_course(enrolment_id: int) -> None:
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
INSERT INTO course (name, description, instructor_id)
VALUES (?, ?, ?)
'''

__edit_sql = '''
UPDATE course
SET
	name = ?,
	description = ?,
	instructor_id = ?
WHERE course_id = ?
'''

__delete_sql = '''
DELETE FROM course
WHERE course_id = ?
'''