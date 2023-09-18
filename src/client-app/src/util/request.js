
export async function httpGet(url) {
	let token = sessionStorage.getItem('jwt');

	return await fetch(url, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
}

export async function httpPost(url, body) {
	let token = sessionStorage.getItem('jwt');

	return await fetch(url, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(body)
	});
}