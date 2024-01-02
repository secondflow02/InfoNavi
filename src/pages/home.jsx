import styled from 'styled-components'
import Center from '../components/center'
import Compressor from '../components/compressor'
import SearchManager from '../components/search-manager'
import Spacer from '../components/spacer'
import { COLOR } from '../libs/styeld-components/tokens'
import LogoImg from '/logo/logo-766x152.webp'

const Home = () => {
	return (
		<Compressor>
			<Center
				$bgColor={COLOR.grayScale[1500] + 'BF'}
				$radius='3rem'
				$variant='outline'
			>
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
	width: 30%;
`

const FlexColumnContainer = styled.div`
	position: relative;
	display: flex;

	flex-direction: column;
	align-items: center;

	gap: 1rem;
`

const S = {
	Logo,
	FlexColumnContainer
}
