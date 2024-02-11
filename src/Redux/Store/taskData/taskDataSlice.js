import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	taskDatas: [],
	error: null,
	loading: false,
}

const taskDataSlice = createSlice({
	name: 'taskData',
	initialState,
	reducers: {
		addTask: (state, action) => {
			// state.taskDatas.push(action.payload)
			state.push(action.payload)
		},
		editTask: (state, action) => {
			let index = state.findIndex((x) => x.id === action.payload.id)
			state.splice(index, 1, action.payload)
		},
		deleteTask: (state, action) => {
			state = state.filter((x) => x.id !== action.payload.id)
			return state
		},
	},
})

export const { addTask, editTask, deleteTask } = taskDataSlice.actions

export default taskDataSlice.reducer
