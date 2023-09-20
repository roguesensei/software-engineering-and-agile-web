import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar } from '@mui/material';

const TranscendentDrawer = styled(Drawer)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 2
}));

export default function BaseDrawer({ children, title, open, showAction = true, anchor = 'right', onClose = () => {}, onAction = () => {} }){
	return (
		<TranscendentDrawer
			variant={'temporary'}
			anchor={anchor}
			open={open}
			onClose={onClose}
		>
			<div style={{ height: '100vh', overflow: 'hidden', flexDirection: 'column', display: 'flex' }}>
				<AppBar elevation={0} position='static'>
					<Toolbar variant='dense' style={{ justifyContent: 'space-between', display: 'flex', paddingRight: '0px' }}>
						{title}
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={onClose}>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Box sx={(theme) => ({ padding: theme.spacing(1), width: '450px', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' })}>
					<div style={{ overflowY: 'auto', flexGrow: 1 }}>
						{children}
					</div>
					{showAction ?
						<Button variant={'contained'} onClick={onAction}>
							{title}
						</Button> : null
					}
				</Box>
			</div>
		</TranscendentDrawer>
	)
}