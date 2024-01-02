import styled from 'styled-components'
import Center from '../components/center'
import Compressor from '../components/compressor'
import SearchManager from '../components/search-manager'
import Spacer from '../components/spacer'
import { BREAK_POINT, COLOR } from '../libs/styeld-components/tokens'
import LogoImg from '/logo/logo-766x152.webp'

const Home = () => {
	return (
		<Compressor>
			<Center>
				<S.FlexColumnContainer>
					<S.Logo src={LogoImg} width='30%' />
					<Spacer $height='3rem' />
					<SearchManager $width='50%' $radius='3rem' />
				</S.FlexColumnContainer>
			</Center>
		</Compressor>
	)
}

export default Home

const Logo = styled.img`
	width: 40%;
`

const FlexColumnContainer = styled.div`
	width: 100%;
	height: 100%;
	@media screen and (max-width: ${BREAK_POINT.md}) {
		height: 80%;
	}
	@media screen and (max-width: ${BREAK_POINT.sm}) {
		height: 50%;
	}

	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: ${COLOR.grayScale[1500] + 'BF'};
	border: 1px solid ${COLOR.grayScale[1200]};
	border-radius: 3rem;

	gap: 1rem;
`

const S = {
	Logo,
	FlexColumnContainer
}
