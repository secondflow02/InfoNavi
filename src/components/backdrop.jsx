import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Center from './center'
import MainBackgroundImg from '/images/main-background.webp'

const Backdrop = () => {
	return (
		<S.RootContainer>
			<S.ContentWrapper>
				<Outlet />
			</S.ContentWrapper>
			<Center style={{ position: 'absolute', zIndex: '0' }}>
				<img src={MainBackgroundImg} height='100%' />
			</Center>
		</S.RootContainer>
	)
}

export default Backdrop

const RootContainer = styled.div`
	width: 100%;
	height: 1vh;
`
const ContentWrapper = styled.div`
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
`
const S = {
	RootContainer,
	ContentWrapper
}
