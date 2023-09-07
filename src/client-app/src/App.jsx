import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import theme from './theme';
// import Test from './pages/Test';
import Home from './pages/Home';
import Login from './pages/Login';

import './App.css';
import UserSettings from './pages/UserSettings';

export default function App() {

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path={'/'}>
					<Route path={'/'} element={<Home/>} />
					<Route path={'/users'} element={<UserSettings />} />
				</Route>
				<Route path={'/auth'}>
					<Route path={'login'} element={<Login />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}