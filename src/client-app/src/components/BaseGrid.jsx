import React from 'react';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

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

export function EditAction({onClick = () => {}}) {
	return (
		<GridActionsCellItem
			icon={<Edit />}
			label={'Edit'}
			onClick={onClick}
			color={'inherit'}
		/>
	)
}

export function DeleteAction({onClick = () => {}}) {
	return (
		<GridActionsCellItem
			icon={<Delete />}
			label={'Delete'}
			onClick={onClick}
			color={'inherit'}
		/>
	)
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
