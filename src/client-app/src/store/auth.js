import { httpGet } from '../util/request';

export async function isAuthenticated() {
	let res = await httpGet('/auth');

	return res.ok;
}

export async function auth(form) {
	let res = await fetch('/login', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(form)
	});

	return res;
}