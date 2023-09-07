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

__get_sql = '''
SELECT
	c.rowid,
	c.name,
	c.instructor_id,
	c.description
FROM course c
'''