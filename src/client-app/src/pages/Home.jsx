import { useEffect, useState } from 'react'
import { isAuthenticated } from '../store/auth';

export default function Home() {
	useEffect(() => {
		(async() => {
			let authed = await isAuthenticated();

			if (!authed) {
				window.location.href = '/auth/login'
			}
		})();
	},[]);

	return (
		<p>Hello</p>
	)
}