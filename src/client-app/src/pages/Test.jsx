import { useEffect, useState } from 'react';
import { loadTest, sendTest } from '../store/test';
import { Button, Card, Typography } from '@mui/material';

export default function Test() {
	const [test, setTest] = useState([]);

	useEffect(() => {
		(async() => {
			setTest(await loadTest());
		})();
	}, []);

	return (

		<Card elevation={3}>
			<Typography variant={'h1'}>Test</Typography>
			<ul>
				{
					test.map((x) => <li>{x}</li>)
				}
			</ul>
			<Button 
				variant={'contained'} 
				onClick={() => {
					sendTest().then((data) => console.debug(data));
				}}
			>
				Hello World
			</Button>
		</Card>
	);
}