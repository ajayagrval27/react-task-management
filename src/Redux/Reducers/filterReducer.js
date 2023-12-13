export const filterTaskDetails = (taskDetails, filterOption) => {
	switch (filterOption) {
		case 'All':
			return taskDetails

		case 'Completed':
			return taskDetails.filter((task) => task.isCompleted === true)

		case 'Not Completed':
			return taskDetails.filter((task) => task.isCompleted === false)

		default:
			return taskDetails
	}
}
