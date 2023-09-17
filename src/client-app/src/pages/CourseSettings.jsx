import { useEffect, useMemo, useState } from 'react'
import { loadCourses } from '../store/course';
import { loadUsers, userRoles } from '../store/user';
import BaseGrid from '../components/BaseGrid';
import { loadCurrentUser } from '../store/auth';
import Toast from '../components/Toast';
import useToast from '../util/toast';
import BaseDrawer from '../components/BaseDrawer';
import { TextField } from '@mui/material';
import DropDownList from '../components/DropdownList';

export default function CourseSettings() {
	const [data, setData] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [instructors, setInstructors] = useState([]);
	
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [instructorId, setInstructorId] = useState(null);
	const [editDrawerOpen, setEditDrawerOpen] = useState(false);

	const [courseTitleError, setCourseTitleError] = useState(false);
	const [courseDescriptionError, setCourseDescriptionError] = useState(false);
	const [instructorIdError, setInstructorIdError] = useState(false);

	const toastHandler = useToast();
	const {toast} = toastHandler;

	useEffect(() => {
		(async () => {
			setData(await loadCourses());
		})();
	}, []);

	useEffect(() => {
		(async() => {
			setCurrentUser(await loadCurrentUser());
		})();
	}, []);

	useEffect(() => {
		(async() => {
			let users = await loadUsers();

			setInstructors(users.filter((x) => x.role === userRoles.Admin))
		})();
	}, []);

	const columns = useMemo(() => {
		return [
			{
				field: 'name',
				headerName: 'Course Title',
				width: 300
			},
			{
				field: 'description',
				headerName: 'Description',
				width: 500
			},
			{
				field: 'instructorId',
				headerName: 'Instructor',
				width: 300,
				valueGetter: ({row}) => {
					return instructors.filter((x) => x.userId === row.instructorId)[0]?.username
				}
			}
		]
	}, [instructors]);

	return (
		<>
			<BaseGrid
				columns={columns}
				rows={data}
				getRowId={(x) => x.courseId}
				onAdd={() => {
					if (currentUser.role === userRoles.Admin){
						setCourseTitle('');
						setCourseDescription('');
						setInstructorId(null);
						setEditDrawerOpen(true);
					}
					else {
						toast('You need to be an admin to do that', 'warning');
					}
				}}
			/>
			<BaseDrawer
				title={'Edit Course'}
				open={editDrawerOpen}
				onAction={() => {
					if (courseTitleError || courseDescriptionError) {
						toast('One or more fields have too many characters', 'warning');
						return;
					}

					let valid = true;
					if (courseTitle.trim() === ''){
						setCourseTitleError(true);
						valid = false;
					}
					if (!instructorId) {
						setInstructorIdError(true);
						valid = false;
					}

					if (!valid) {
						toast('Missing one or more required fields', 'warning');
					}
				}}
				onClose={() => setEditDrawerOpen(false)}
			>
				<div style={{margin: 8}}>
					<TextField
						fullWidth
						required
						label={'Course Title'}
						value={courseTitle}
						error={courseTitleError}
						onChange={(e) => {
							setCourseTitle(e.target.value);
							setCourseTitleError(e.target.value.length >= 200);
						}}
						style={styles.field}
					/>
					<TextField
						fullWidth
						multiline
						label={'Course Description'}
						value={courseDescription}
						error={courseDescriptionError}
						onChange={(e) => {
							setCourseDescription(e.target.value);
							setCourseDescriptionError(e.target.value.length >= 500);
						}}
						rows={4}
						style={styles.field}
					/>
					<DropDownList
						fullWidth
						required
						data={instructors}
						value={instructorId}
						onChange={(x) => {
							setInstructorId(x);
							setInstructorIdError(false);
						}}
						error={instructorIdError}
						getItemLabel={(x) => x.username}
						getItemValue={(x) => x.userId}
						label={'Instructor'}
						style={styles.field}
					/>
				</div>
			</BaseDrawer>
			<Toast toastHandler={toastHandler} />
		</>
	);
}

const styles = {
	field: {
		margin: 4
	}
}