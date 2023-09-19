import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import theme from './theme';
// import Test from './pages/Test';
import Home from './pages/Home';
import Login from './pages/Login';
import UserSettings from './pages/UserSettings';
import CourseSettings from './pages/CourseSettings';
import EnrolmentSettings from './pages/EnrolmentSettings';

//import './App.css';
import Layout from './components/Layout';

export default function App() {

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path={'/'}>
						<Route path={'/'} element={<Home/>} />
						<Route path={'/courses'} element={<CourseSettings/>} />
						<Route path={'/users'} element={<UserSettings />} />,
						<Route path={'/enrolments'} element={<EnrolmentSettings />} />,
					</Route>
					<Route path={'/auth'}>
						<Route path={'login'} element={<Login />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</LocalizationProvider>
	);
}