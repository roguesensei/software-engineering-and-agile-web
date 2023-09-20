import { useEffect, useMemo, useState } from 'react'
import { deleteUser, editUser, loadUsers, userRoleOpt, userRoles } from '../store/user';
import BaseGrid, { DeleteAction, EditAction } from '../components/BaseGrid';
import Layout from '../components/Layout';
import BaseDrawer from '../components/BaseDrawer';
import useToast from '../util/toast';
import { loadCurrentUser } from '../store/auth';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import DropDownList from '../components/DropdownList';

export default function UserSettings(){
	const [data, setData]= useState([]);
	const [currentUser, setCurrentUser] = useState({});

	const [role, setRole] = useState(0);
	const [editId, setEditId] = useState(null);
	const [deleteId, setDeleteId] = useState(null);
	
	const toastHandler = useToast();
	const { toast } = toastHandler;

	const reload = async() => {
		setData(await loadUsers());
	}

	const hasPermission = () => {
		// Check current user is an admin
		let permitted = currentUser.role === userRoles.Admin
		if (!permitted) {
			toast('You need to be an admin to do that', 'warning');
		}
		return permitted;
	}

	useEffect(() => {
		(async () => {
			await reload();
		})();
	}, []);
	
	useEffect(() => {
		(async() => {
			setCurrentUser(await loadCurrentUser());
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
			},
			{
				field: 'actions',
				type: 'actions',
				cellClassName: 'actions',
				headerName: 'Actions',
				width: 100,
				getActions: ({ id, row }) => [
					<DeleteAction onClick={() => {
						if (hasPermission()) {
							if (row.role === userRoles.Admin) {
								toast('Cannot delete Admin users', 'warning');
							}
							else {
								setDeleteId(id);
							}
						}
					}} />,
					<EditAction onClick={() => {
						if (hasPermission()) {
							if (row.role === userRoles.Admin) {
								toast('Cannot edit Admin users', 'warning');
							}
							else {
								setRole(row.role);
								setEditId(id);
							}
						}
					}} />
				]
			}
		]
	}, [hasPermission]);

	return (
		<Layout>
			<BaseGrid
				columns={columns}
				rows={data}
				getRowId={(x) => x.userId}
			/>
			<BaseDrawer
				title={'Edit User'}
				open={!!editId}
				onAction={() => {
					editUser(editId, role).then((ok) => {
						if (ok) {
							toast('Updated user successfully', 'success');
							setEditId(null);
							reload();
						}
						else {
							toast('An unknown error occured', 'error');
						}
					});
				}}
				onClose={() => setEditId(null)}
			>
				<div style={{ margin: 8 }}>
					<DropDownList
						fullWidth
						required
						data={userRoleOpt}
						value={role}
						onChange={setRole}
						getItemLabel={(x) => x.label}
						getItemValue={(x) => x.value}
						label={'Role'}
						style={styles.field}
					/>
				</div>
			</BaseDrawer>
			<ConfirmDialog
				open={!!deleteId}
				title={'Are you sure you want to delete this item?'}
				onNo={() => setDeleteId(null)}
				onYes={() => {
					deleteUser(deleteId)
						.then((ok) => {
							if (ok) {
								toast('Deleted user successfully', 'success');
								reload();	
							}
							else {
								toast('An unknown error occured', 'error');
							}
							setDeleteId(null);
						});
				}}
			/>
			<Toast toastHandler={toastHandler} />
		</Layout>
	);
}

const styles = {
	field: {
		margin: 4
	}
}