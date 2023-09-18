import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function ConfirmDialog({ onYes, onNo, open, title }) {
	return (
		<Dialog
			maxWidth='xs'
			open={open}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogActions>
				<Button onClick={onYes}>
					Yes
				</Button>
				<Button onClick={onNo}>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
}