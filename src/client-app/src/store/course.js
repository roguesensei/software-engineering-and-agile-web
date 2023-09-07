import { httpGet } from '../util/request';

export async function loadCourses() {
	let res = await httpGet('/getCourses');

	if (res.ok) {
		return await res.json();
	}

	return [];
}