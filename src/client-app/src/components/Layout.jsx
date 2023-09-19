import { AppBar, Divider, IconButton, Menu, Paper, Toolbar } from '@mui/material';
import { useState } from 'react';
import NavMenu from './NavMenu';

export default function Layout({ children }) {
	const [navMenuOpen, setNavMenuOpen] = useState(false);

	return (
		<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: '#f2f2f3' }}>
			<AppBar position='static' color='secondary' sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}>
				<Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
					<div style={{ display: 'flex' }}>
						<IconButton
							size='large'
							edge='start'
							aria-label='menu'
							onClick={() => { setNavMenuOpen(true); }}
							style={{ width: 50, marginLeft: '-24px' }}>
							<Menu />
						</IconButton>
						<Divider variant='middle' orientation='vertical' flexItem />
					</div>
				</Toolbar>
			</AppBar>
			{/* <div style={{ flexGrow: 1, display: 'flex' }}> */}
				<NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
				<Paper style={{
					position: 'static',
					flexGrow: 1,
					display: 'flex',
					alignItems: 'stretch',
					flexDirection: 'column',
					maxHeight: '90vh'
				}}>
					{children}
				</Paper>
			{/* </div> */}
		</div>
	)
}