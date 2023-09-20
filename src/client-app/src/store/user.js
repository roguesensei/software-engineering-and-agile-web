import { httpGet, httpPost } from '../util/request';

export const userRoles = {
	'Guest': 0,
	'Admin': 1 
};

export const userRoleOpt = Object.keys(userRoles).map((x) => ({label: x, value: userRoles[x]}));

export async function loadUsers() {
	let res = await httpGet('/user/get');

	if (res.ok) {
		return await res.json();
	}

	return [];
}

export async function editUser(userId, role) {
	let res = await httpPost('/user/update', { userId, role });

	return res.ok;
}

export async function deleteUser(userId) {
	let res = await httpPost('/user/delete', { userId });

	return res.ok;
}