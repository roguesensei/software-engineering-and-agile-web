import { useEffect, useState } from 'react';
import { loadTest } from './store/test';
import { Button, Typography } from '@mui/material';

export default function App() {
	const [test, setTest] = useState([]);

	useEffect(() => {
		(async() => {
			setTest(await loadTest());
		})();
	},[]);

  	return (
		<>
 	  		<Typography variant={'h1'}>Test</Typography>
			<ul>
				{
					test.map((x) => <li>{x}</li>)
				}
			</ul>
			<Button variant={'contained'}>Hello World</Button>
		</>
	);
}