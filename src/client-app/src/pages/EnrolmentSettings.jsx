import { useEffect, useMemo, useState } from 'react'
import { loadCourses } from '../store/course';
import { loadUsers, userRoles } from '../store/user';
import BaseGrid, { DeleteAction, EditAction } from '../components/BaseGrid';
import { loadCurrentUser } from '../store/auth';
import Toast from '../components/Toast';
import useToast from '../util/toast';
import BaseDrawer from '../components/BaseDrawer';
import DropDownList from '../components/DropdownList';
import ConfirmDialog from '../components/ConfirmDialog';
import { addEnrolment, deleteEnrolment, editEnrolment, loadEnrolments } from '../store/enrolment';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Layout from '../components/Layout';

export default function EnrolmentSettings() {
	const [data, setData] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [courses, setCourses] = useState([]);
	const [users, setUsers] = useState([]);
	
	const [courseId, setCourseId] = useState(null);
	const [userId, setUserId] = useState(null);
	const [courseDate, setCourseDate] = useState(dayjs())
	const [editId, setEditId] = useState(null);
	const [deleteId, setDeleteId] = useState(null);
	const [editDrawerOpen, setEditDrawerOpen] = useState(false);

	const [courseIdError, setCourseIdError] = useState(false);
	const [userIdError, setUserIdError] = useState(false);

	const toastHandler = useToast();
	const { toast } = toastHandler;
	
	const reload = async() => {
		setData(await loadEnrolments());
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

	useEffect(() => {
		(async() => {
			setUsers(await loadUsers());
		})();
	}, []);

	useEffect(() => {
		(async() => {
			setCourses(await loadCourses())
		})();
	}, []);

	const columns = useMemo(() => {
		return [
			{
				field: 'courseId',
				headerName: 'Course',
				width: 300,
				valueGetter: ({row}) => {
					return courses.filter((x) => x.courseId === row.courseId)[0]?.name
				}
			},
			{
				field: 'userId',
				headerName: 'User',
				width: 300,
				valueGetter: ({row}) => {
					return users.filter((x) => x.userId === row.userId)[0]?.username
				}
			},
			{
				field: 'courseDate',
				headerName: 'Course Date',
				width: 200
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
							setDeleteId(id);
						}
					}} />,
					<EditAction onClick={() => {
						if (hasPermission()) {
							setEditId(id);
							setCourseId(row.courseId);
							setUserId(row.userId);
							setCourseDate(dayjs(row.courseDate));
							setEditDrawerOpen(true);
						}
					}} />
				]
			}
		]
	}, [users, courses, hasPermission]);

	return (
		<Layout>
			<BaseGrid
				columns={columns}
				rows={data}
				getRowId={(x) => x.enrolmentId}
				onAdd={() => {
					if (hasPermission()) {
						setCourseId(null);
						setUserId(null);
						setCourseDate(dayjs())
						setEditDrawerOpen(true);
					}
				}}
			/>
			<BaseDrawer
				title={!!editId ? 'Edit Enrolment' : 'Add Enrolment'}
				open={editDrawerOpen}
				onAction={() => {
					let valid = true;
					if (!courseId){
						setCourseIdError(true);
						valid = false;
					}
					if (!userId) {
						setUserIdError(true);
						valid = false;
					}

					if (!valid) {
						toast('Missing one or more required fields', 'warning');
					}
					else {
						if (!!editId) {
							editEnrolment(editId, courseId, userId, courseDate).then((ok) => {
								if (ok) {
									toast('Updated enrolment successfully', 'success');
									setEditDrawerOpen(false);
									setEditId(null);
									reload();
								}
								else {
									toast('An unknown error occured', 'error');
								}
							})
						}
						else {
							addEnrolment(courseId, userId, courseDate.toISOString())
								.then((ok) => {
									if (ok) {
										toast('Added new enrolment successfully', 'success');
										setEditDrawerOpen(false);
										reload();	
									}
									else {
										toast('An unknown error occured', 'error');
									}
								})
						}
					}
				}}
				onClose={() => {
					setEditDrawerOpen(false);
					setEditId(null);
				}}
			>
				<div style={{margin: 8}}>
					<DropDownList
						fullWidth
						required
						data={courses}
						value={courseId}
						onChange={(x) => {
							setCourseId(x);
							setCourseIdError(false);
						}}
						error={courseIdError}
						getItemLabel={(x) => x.name}
						getItemValue={(x) => x.courseId}
						label={'Course'}
						style={styles.field}
					/>
					<DropDownList
						fullWidth
						required
						data={users}
						value={userId}
						onChange={(x) => {
							setUserId(x);
							setUserIdError(false);
						}}
						error={userIdError}
						getItemLabel={(x) => x.username}
						getItemValue={(x) => x.userId}
						label={'Student'}
						style={styles.field}
					/>
					<DatePicker
						value={courseDate}
						onChange={setCourseDate}
						label={'Course Date'}
						sx={{marginTop: 2}}
					/>
				</div>
			</BaseDrawer>
			<ConfirmDialog
				open={!!deleteId}
				title={'Are you sure you want to delete this item?'}
				onNo={() => setDeleteId(null)}
				onYes={() => {
					deleteEnrolment(deleteId)
						.then((ok) => {
							if (ok) {
								toast('Deleted enrolment successfully', 'success');
								setEditDrawerOpen(false);
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