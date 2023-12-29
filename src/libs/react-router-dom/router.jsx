import { createBrowserRouter } from 'react-router-dom'
import Backdrop from '../../components/backdrop'
import Home from '../../pages/home'

const router = createBrowserRouter([
	{
		path: '',
		element: <Backdrop />,
		children: [{ path: '/', element: <Home /> }]
	}
])

export default router
