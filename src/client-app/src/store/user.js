import { httpGet } from '../util/request';

export const userRoles = {
	'Guest': 0,
	'Admin': 1 
};


export const userRoleOpt = Object.keys(userRoles).map((x) => ({label: x, value: userRoles[x]}));

export async function loadUsers() {
	let res = await httpGet('/getUsers');

	if (res.ok) {
		return await res.json();
	}

	return [];
}