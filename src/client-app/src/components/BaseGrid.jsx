import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function BaseGrid({columns, rows, getRowId, onAdd = () => {}}) {
	return (
		<DataGrid
			columns={columns}
			rows={rows}
			getRowId={getRowId}
			slots={{toolbar: () => <GridToolbar onAdd={onAdd} />}}
		/>
	);
}

function GridToolbar({onAdd = () => {} }) {
	return (
		<GridToolbarContainer>
			<AddRowButton onClick={onAdd} />
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function AddRowButton({ onClick = () => {} }) {
	
	return (
	<Button
		size='small'
		aria-label={'Add Row'}
		title={'Add Row'}
		startIcon={<Add />}
		onClick={onClick}
	>
		Add Row
	</Button>
	);
}