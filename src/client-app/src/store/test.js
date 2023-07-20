
export async function loadTest() {
	let res = await fetch('/test');
	if (res.ok) {
		let out = await res.json();

		return out;
	}
	return [];
}