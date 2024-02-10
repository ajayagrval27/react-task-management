// import { createStore, applyMiddleware } from 'redux'
// import { rootReducer } from '../Reducers/rootReducer'
// import { thunk } from 'redux-thunk'

// export const store = createStore(rootReducer, applyMiddleware(thunk))

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import taskDataReducer from '../Reducers/taskDataReducer'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	taskData: taskDataReducer,
})

const persistedStore = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedStore,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
