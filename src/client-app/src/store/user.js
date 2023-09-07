import { httpGet } from '../util/request';

export const roleOpt = [
	{value: 0, label: 'Guest'},
	{value: 1, label: 'Admin'}
]

export async function loadUsers() {
	let res = await httpGet('/getUsers');

	if (res.ok) {
		return await res.json();
	}

	return [];
}