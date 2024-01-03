import { createBrowserRouter } from 'react-router-dom'
import Backdrop from '../../components/backdrop'
import Home from '../../pages/home'

const Router = createBrowserRouter([
	{
		path: '',
		element: <Backdrop />,
		children: [{ path: '/', element: <Home /> }]
	}
])

export default Router
