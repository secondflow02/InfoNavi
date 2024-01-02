import { RouterProvider } from 'react-router-dom'
import router from './libs/react-router-dom/router'
import GlobalStyles from './libs/styeld-components/global-styles'

const App = () => {
	return (
		<>
			<GlobalStyles />
			<RouterProvider router={router} />
		</>
	)
}

export default App
