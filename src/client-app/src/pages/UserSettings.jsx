import { useEffect, useMemo, useState } from 'react'
import { loadUsers, roleOpt } from '../store/user';
import BaseGrid from '../components/BaseGrid';

export default function UserSettings(){
	const [data, setData]= useState([]);

	useEffect(() => {
		(async() => {
			setData(await loadUsers());
		})();
	}, []);

	const columns = useMemo(() => {
		return [
			{
				field: 'userName',
				headerName: 'Username',
				width: 300
			},
			{
				field: 'role',
				headerName: 'Role',
				width: 200,
				valueGetter:({row}) => {
					return roleOpt.filter((x) => x.value === row.role)[0]?.label || 'Unknown'
				}
			}
		]
	}, []);

	return (
		<BaseGrid
			columns={columns}
			rows={data}
			getRowId={(x) => x.userId}
		/>
	);
}