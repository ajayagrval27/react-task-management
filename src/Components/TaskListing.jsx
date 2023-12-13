import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { filterTaskDetails } from '../Redux/Reducers/filterReducer'

const TaskListing = () => {
	let taskDetails = useSelector((state) => state.taskData)
	const [filterOption, setFilterOption] = useState(
		localStorage.getItem('filterOption') || 'All'
	)
	const filteredTasks = filterTaskDetails(taskDetails, filterOption)

	useEffect(() => {
		localStorage.setItem('filterOption', filterOption)
	}, [filterOption])

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const editData = (editId) => {
		navigate(`/taskform/${editId}`)
	}
	const deleteData = (id) => {
		dispatch({ type: 'DELETE_TASK', id: id })
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					spring: { duration: 1 },
					delay: 0.1,
					type: 'spring',
					bounce: 0.5,
				}}
			>
				<div
					style={{
						marginTop: '1rem',
						marginLeft: '20rem',
						marginRight: '2rem',
					}}
				>
					<Link style={{ marginRight: '10rem' }} to="/taskform">
						<Button className="me-4 bg-success">ADD TASK</Button>
					</Link>

					<Button
						className="me-4 bg-primary"
						onClick={() => setFilterOption('All')}
					>
						All Task
					</Button>

					<Button
						className="me-4 bg-primary"
						onClick={() => setFilterOption('Completed')}
					>
						Completed Task
					</Button>
					<Button
						className="me-4 bg-primary"
						onClick={() => setFilterOption('Not Completed')}
					>
						Not Completed Task
					</Button>
				</div>
				<Table
					className="mt-4 shadow p-3 rounded"
					style={{
						width: '75%',
						margin: 'auto',
						padding: '1rem',
						textAlign: 'center',
					}}
					striped
					bordered
					hover
				>
					<thead>
						<tr>
							<th>Id</th>
							<th>Task Title</th>
							<th>Task Status</th>
							<th colSpan={2}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredTasks?.map((x, i) => {
							return (
								<tr key={i}>
									<td style={{ padding: '19px 10px' }}>
										{x.id}
									</td>
									<td style={{ padding: '19px 10px' }}>
										{x.taskTitle}
									</td>
									<td style={{ padding: '19px 10px' }}>
										{x.isCompleted
											? 'Completed'
											: 'Not Completed'}
									</td>
									<td style={{ padding: '12px 5px' }}>
										<button
											onClick={() => editData(x.id)}
											className="btn btn-info"
										>
											Edit
										</button>
									</td>
									<td style={{ padding: '12px 5px' }}>
										<button
											onClick={() => deleteData(x.id)}
											className="btn btn-danger"
										>
											Delete
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</motion.div>
		</>
	)
}

export default TaskListing
