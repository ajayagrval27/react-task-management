import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import TaskIndivisual from './Components/TaskIndivisual'
import TaskListing from './Components/TaskListing'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/taskform" />} />
					<Route path="/taskform" element={<TaskIndivisual />}>
						<Route path=":editId" />
					</Route>
					<Route path="/taskdata" element={<TaskListing />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
