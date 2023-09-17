import { Alert, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function Toast({
	toastHandler: {
		snackbarOpen,
		snackbarSeverity,
		snackbarMessage,
		closeSnackbar
	}
}) {
	return (
		<Snackbar
			open={snackbarOpen}
			autoHideDuration={6000}
			onClose={closeSnackbar}
			action={<>
				<IconButton
					size='small'
					aria-label='close'
					color='inherit'
					onClick={closeSnackbar}
				>
					<Close fontSize='small' />
				</IconButton>
			</>}
		>
			<Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
				{snackbarMessage}
			</Alert>
		</Snackbar>
	)
}