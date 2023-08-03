import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import theme from './theme';
import Test from './pages/Test';

export default function App() {

  	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path={'/'}>
					<Route path={'/test'} element={<Test/>} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}