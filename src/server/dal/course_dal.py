import sqlite3

from models.course import Course
from util.server_config import server_config

def get_courses() -> list[Course]:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	cur.execute(__get_sql)

	rows = cur.fetchall()
	con.close()

	courses: list[Course] = []
	for row in rows:
		course = Course()
		course.course_id = row[0]
		course.name = row[1]
		course.instructor_id = row[2]
		course.description = row[3]
		
		courses.append(course)
	return courses

def add_course(course: Course) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	
	cur.execute(__add_sql, (course.name, course.description, course.instructor_id))
	con.commit()
	cur.close()

def edit_course(course: Course) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	
	cur.execute(__edit_sql, (course.name, course.description, course.instructor_id, course.course_id))
	con.commit()
	cur.close()

def delete_course(course_id: int) -> None:
	con = sqlite3.connect(server_config['db_file_path'])
	cur = con.cursor()
	
	cur.execute(__delete_sql, str(course_id)) # Cast to string to prevent exception
	con.commit()
	cur.close()

__get_sql = '''
SELECT
	c.course_id,
	c.name,
	c.instructor_id,
	c.description
FROM course c
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