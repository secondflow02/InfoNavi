import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import router from './libs/react-router-dom/router'
import GlobalStyles from './libs/styeld-components/global-styles'

const App = () => {
	return (
		<RecoilRoot>
			<GlobalStyles />
			<RouterProvider router={router} />
		</RecoilRoot>
	)
}

export default App
