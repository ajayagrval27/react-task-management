import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { deleteTask } from '../Redux/Reducers/taskDataReducer'
import { filterTaskDetails } from '../Redux/Reducers/filterReducer'
import { Pagination } from 'react-bootstrap'

const TaskListing = () => {
	let taskDetails = useSelector((state) => state.taskData)
	const [filteredTasks, setFilteredTasks] = useState(taskDetails)
	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentTasks = filteredTasks.slice(startIndex, endIndex)
	const [totalItems, setTotalItems] = useState(filteredTasks.length)
	// const [filterOption, setFilterOption] = useState('')
	// const filteredTasks = filterTaskDetails(taskDetails, filterOption)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		setFilteredTasks(taskDetails)
	}, [taskDetails])

	const handleFilter = (value) => {
		setSearchValue(value)
		const filteredData = taskDetails.filter((x) =>
			x.taskTitle.toLowerCase().includes(value.toLowerCase())
		)
		setFilteredTasks(filteredData)
		setTotalItems(filteredData.length)
	}

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const editData = (editId) => {
		navigate(`/taskform/${editId}`)
	}
	const deleteData = (id) => {
		console.log('id', id)
		dispatch(deleteTask({ id: id }))
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
				<div className="w-75 mt-4 mb-4 mx-auto border border-2 shadow">
					<div
						className="mt-1 rounded"
						style={{
							// marginTop: '1.5rem',
							// width: '75%',
							margin: 'auto',
							padding: '0.5rem',
							textAlign: 'center',
						}}
					>
						<div className="d-flex justify-content-between">
							<Link
								style={{ marginRight: '10rem' }}
								to="/taskform"
							>
								<Button className="me-4 bg-success">
									ADD TASK
								</Button>
							</Link>

							<div
								style={{ width: '40%' }}
								className="form-group has-search"
							>
								<span className="fa fa-search form-control-feedback"></span>
								<input
									type="text"
									className="form-control"
									placeholder="Search Task..."
									value={searchValue}
									onChange={(e) => {
										setSearchValue(e.target.value)
										handleFilter(e.target.value)
									}}
								/>
							</div>
						</div>
						{/* <Button
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
					</Button> */}
					</div>
					<Table
						className="mt-1 p-3 rounded"
						style={{
							// width: '75%',
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
								<th style={{ width: '8%' }}>Task Id</th>
								<th style={{ width: '45%' }}>Task Title</th>
								<th style={{ width: '25%' }}>Task Status</th>
								<th style={{ width: '22%' }} colSpan={2}>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{currentTasks?.map((x, i) => {
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
					<Pagination
						className="mt-2 mb-2 rounded"
						style={{
							justifyContent: 'flex-end',
							// width: '75%',
							margin: 'auto',
						}}
					>
						{/* Add first/previous if needed */}
						<Pagination.First onClick={() => paginate(1)} />
						<Pagination.Prev
							onClick={() => paginate(currentPage - 1)}
						/>

						{/* Create numbered pagination items */}
						{Array.from({
							length: Math.ceil(totalItems / itemsPerPage),
						}).map((_, index) => (
							<Pagination.Item
								key={index}
								active={index + 1 === currentPage}
								onClick={() => paginate(index + 1)}
							>
								{index + 1}
							</Pagination.Item>
						))}

						{/* Add next/last buttons if needed */}
						<Pagination.Next
							onClick={() => paginate(currentPage + 1)}
						/>
						<Pagination.Last
							onClick={() =>
								paginate(Math.ceil(totalItems / itemsPerPage))
							}
						/>
					</Pagination>
				</div>
			</motion.div>
		</>
	)
}

export default TaskListing
