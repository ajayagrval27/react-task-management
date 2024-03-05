import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { addTask, editTask } from '../Redux/Store/taskData/taskDataSlice'

const TaskIndivisual = () => {
	let [taskObj, setTaskObj] = useState({
		taskTitle: '',
		isCompleted: false,
	})
	let [countId, setCountId] = useState(
		JSON.parse(localStorage.getItem('countId')) ?? 0
	)
	let [errorObj, setErrorObj] = useState({})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()
	const taskDetails = useSelector((state) => state.taskData.taskDatas)

	useEffect(() => {
		if (params.editId) {
			let editData = taskDetails.find((x) => x.id == params.editId)
			setTaskObj({ ...editData })
		}
	}, [taskDetails, params.editId])

	const addData = (e) => {
		if (e.target.type === 'checkbox') {
			setTaskObj({
				...taskObj,
				[e.target.name]: e.target.checked,
			})
		} else {
			setTaskObj({
				...taskObj,
				[e.target.name]: e.target.value,
			})
		}
		if (e.target.value.length === 0) {
			errorObj['taskTitle'] = 'Please enter task title'
		} else {
			delete errorObj['taskTitle']
		}
		setErrorObj({ ...errorObj })
	}

	const submitData = () => {
		if (taskObj.taskTitle === '') {
			errorObj['taskTitle'] = 'Please enter task title'
		} else {
			delete errorObj['taskTitle']
		}
		setErrorObj({ ...errorObj })

		if (Object.keys(errorObj).length === 0) {
			if (params.editId) {
				dispatch(editTask(taskObj))
				navigate('/taskdata')
			} else {
				taskObj.id = countId + 1
				setCountId(countId + 1)
				localStorage.setItem('countId', JSON.stringify(countId + 1))
				dispatch(addTask(taskObj))
				navigate('/taskdata')
			}
		}
		setTaskObj({ taskTitle: '', isCompleted: false })
	}

	// const submitData = () => {
	// 	// form validation check for empty field
	// 	if (taskObj.taskTitle === '') {
	// 		errorObj['taskTitle'] = 'Please enter task title'
	// 	} else {
	// 		delete errorObj['taskTitle']
	// 	}
	// 	setErrorObj({ ...errorObj })

	// 	if (Object.keys(errorObj).length === 0) {
	// 		if (params.editId) {
	// 			dispatch({ type: 'EDIT_TASK', taskObj })
	// 			navigate('/taskdata')
	// 		} else {
	// 			taskObj.id = countId + 1
	// 			setCountId(countId + 1)
	// 			dispatch({
	// 				type: 'ADD_TASK',
	// 				taskObj,
	// 			})
	// 			navigate('/taskdata')
	// 			localStorage.setItem('countId', JSON.stringify(countId + 1))
	// 		}
	// 		setTaskObj({
	// 			taskTitle: '',
	// 			isCompleted: false,
	// 		})
	// 	}
	// }

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
				style={{ width: '70%' }}
				className="mx-auto shadow p-4 mt-4"
			>
				<motion.h2
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						spring: { duration: 1 },
						delay: 0.2,
						type: 'spring',
						bounce: 0.5,
					}}
					className="text-center mb-3 mt-2"
				>
					REACT TASK MANAGEMENT
				</motion.h2>
				<Form className="d-flex justify-content-center align-items-center mt-4">
					<div style={{ width: '40%' }}>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="taskTitle">
								Task Title
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter task title"
								id="taskTitle"
								name="taskTitle"
								value={taskObj.taskTitle ?? ''}
								onChange={addData}
							/>
						</Form.Group>
						{errorObj.taskTitle && (
							<span className="text-danger">
								{errorObj.taskTitle}
							</span>
						)}
					</div>
					{/* checkbox task complet or not */}
					<div
						className="ms-5"
						style={{ width: '25%', marginTop: '1.7rem' }}
					>
						<Form.Group className="mb-3">
							<Form.Check
								type="checkbox"
								label={
									taskObj.isCompleted ? (
										<span className="completed-text">
											Task completed
										</span>
									) : (
										<span className="not-completed-text">
											Task not completed
										</span>
									)
								}
								name="isCompleted"
								id="isCompleted"
								value={taskObj.isCompleted ?? false}
								checked={taskObj.isCompleted ?? false}
								onChange={addData}
							/>
						</Form.Group>
					</div>
					<button
						className="btn btn-success mt-1 me-3"
						type="button"
						onClick={submitData}
					>
						SUBMIT TASK
					</button>
					<Link to="/taskdata">
						<button className="btn btn-info mt-1" type="button">
							TASK LIST
						</button>
					</Link>
				</Form>
			</motion.div>
		</>
	)
}

export default TaskIndivisual
