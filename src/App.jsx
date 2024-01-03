import { RouterProvider } from 'react-router-dom'
import Router from './libs/react-router-dom/router'
import GlobalStyles from './libs/styeld-components/global-styles'

const App = () => {
	return (
		<>
			<GlobalStyles />
			<RouterProvider router={Router} />
		</>
	)
}

export default App
