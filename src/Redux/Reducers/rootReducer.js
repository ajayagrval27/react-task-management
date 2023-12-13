import { combineReducers } from 'redux'
import { taskDataReducer } from './taskDataReducer'

export const rootReducer = combineReducers({
	taskData: taskDataReducer,
})
