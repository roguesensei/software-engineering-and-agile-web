import { useEffect, useState } from 'react';
import { loadTest } from './store/test';

export default function App() {
	const [test, setTest] = useState([]);

	useEffect(() => {
		(async() => {
			setTest(await loadTest());
		})();
	},[]);

  return (
	<>
 	  	<h1>Test</h1>
		<ul>
			{
				test.map((x) => <li>{x}</li>)
			}
		</ul>
	</>

  );
}

