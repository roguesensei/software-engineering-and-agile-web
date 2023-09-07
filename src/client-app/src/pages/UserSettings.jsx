import { useEffect, useMemo, useState } from 'react'
import { loadUsers, userRoleOpt } from '../store/user';
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
				field: 'username',
				headerName: 'Username',
				width: 300
			},
			{
				field: 'role',
				headerName: 'Role',
				width: 200,
				valueGetter:({row}) => {
					return userRoleOpt.filter((x) => x.value === row.role)[0]?.label || 'Unknown'
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