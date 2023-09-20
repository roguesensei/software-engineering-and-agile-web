import BaseDrawer from './BaseDrawer';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Logout, Person, School, Subscriptions } from '@mui/icons-material';

export default function NavMenu({ open, onClose }){
	return (
		<header>
			<BaseDrawer
				title={'LMS'}
				anchor={'left'}
				open={open}
				onClose={onClose}
				showAction={false}
			>
				<NavMenuItem text={'Enrolments'} Icon={Subscriptions} open={open} onClick={() => {
					window.location.href = '/enrolments';
					onClose();
				}} />
				<NavMenuItem text={'Courses'} Icon={School} open={open} onClick={() => {
					window.location.href = '/courses';
					onClose();
				}} />
				<NavMenuItem text={'Users'} Icon={Person} open={open} onClick={() => {
					window.location.href = '/users';
					onClose();
				}} />
				<NavMenuItem text={'Log out'} Icon={Logout} open={open} onClick={() => {
					sessionStorage.clear();
					window.location.href = '/';
				}} />
			</BaseDrawer>
		</header>
	)
}

function NavMenuItem({ open, onClick, text, Icon }) {
	return (
		<ListItem disablePadding onClick={onClick}>
			<ListItemButton sx={{
				minHeight: 48,
				justifyContent: open ? 'initial' : 'center',
				paddingLeft: 2.5,
				paddingRight: 2.5,
			}}>
				<ListItemIcon sx={{
					minWidth: 0,
					marginRight: open ? 3 : 'auto',
					justifyContent: 'center',
				}}>
					<Icon />
				</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem >
	);
}