import { useState } from 'react';

export default function useToast() {
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState('info');

	const toast = (message, severity = 'info') => {
		setSnackbarOpen(true);
		setSnackbarSeverity(severity);
		setSnackbarMessage(message);
	}

	const closeSnackbar = () => setSnackbarOpen(false);

	return { snackbarMessage, snackbarOpen, snackbarSeverity, toast, closeSnackbar };
}