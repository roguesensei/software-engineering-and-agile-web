import { httpGet, httpPost } from '../util/request';

export async function loadCourses() {
	let res = await httpGet('/course/get');
	if (res.ok) {
		return await res.json();
	}
	return [];
}

export async function addCourse(name, description, instructorId) {
	let res = await httpPost('/course/add', { name, description, instructorId });

	return res.ok;
}

export async function editCourse(courseId, name, description, instructorId) {
	let res = await httpPost('/course/edit', { courseId, name, description, instructorId });

	return res.ok;
}

export async function deleteCourse(courseId) {
	let res = await httpPost('/course/delete', { courseId });

	return res.ok;
}