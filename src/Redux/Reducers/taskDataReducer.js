export const taskDataReducer = (
	state = JSON.parse(localStorage.getItem('taskData')) ?? [],
	action
) => {
	switch (action.type) {
		case 'ADD_TASK':
			state.push(action.taskObj)
			localStorage.setItem('taskData', JSON.stringify(state))
			return [...state]

		case 'EDIT_TASK':
			let index = state.findIndex((x) => x.id === action.taskObj.id)
			state.splice(index, 1, action.taskObj)
			localStorage.setItem('taskData', JSON.stringify(state))
			return [...state]

		case 'DELETE_TASK':
			state = [...state.filter((x) => x.id !== action.id)]
			localStorage.setItem('taskData', JSON.stringify(state))
			return [...state]

		default:
			return state
	}
}
