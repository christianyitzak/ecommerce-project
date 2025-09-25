import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'

function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path='checkout' element={<div>checkout</div>} />
		</Routes>
	)
}

export default App
