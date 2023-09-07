import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export default function BaseGrid({columns, rows, getRowId}) {
	return (
		<DataGrid
			columns={columns}
			rows={rows}
			getRowId={getRowId}
			slots={{toolbar: GridToolbar}}
		/>
	)
}

function GridToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	)
}