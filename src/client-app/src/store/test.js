import { httpPost } from '../util/request';

export async function loadTest() {
	let res = await fetch('/test');
	if (res.ok) {
		let out = await res.json();

		return out;
	}
	return [];
}

export async function sendTest() {
	let res = await httpPost('/test', {data: 'Hello'});

	return res;
}