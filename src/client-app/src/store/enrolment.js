import { httpGet, httpPost } from '../util/request';

export async function loadEnrolments() {
	let res = await httpGet('/enrolment/get');
	if (res.ok) {
		return await res.json();
	}
	return [];
}