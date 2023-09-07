import { useEffect, useMemo, useState } from 'react'
import { loadCourses } from '../store/course';
import { loadUsers, userRoles } from '../store/user';
import BaseGrid from '../components/BaseGrid';

export default function CourseSettings() {
	const [data, setData] = useState([]);
	const [instructors, setInstructors] = useState([]);

	useEffect(() => {
		(async () => {
			setData(await loadCourses());
		})();
	}, []);

	useEffect(() => {
		(async() => {
			let users = await loadUsers();
			console.info(users)
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
		<BaseGrid
			columns={columns}
			rows={data}
			getRowId={(x) => x.courseId}
		/>
	);
}