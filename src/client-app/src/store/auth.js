import { httpGet } from '../util/request';

export async function loadCurrentUser() {
	let res = await httpGet('/getCurrentUser');

	if (res.ok) {
		return await res.json()
	}
	return {};
}

export async function isAuthenticated() {
	let res = await httpGet('/getCurrentUser');

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

export async function register(form) {
	let res = await fetch('/register', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(form)
	});

	return res;
}