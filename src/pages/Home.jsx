import styled from 'styled-components'
import Center from '../components/center'
import Compressor from '../components/compressor'
import SearchBox from '../components/search-box'
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
				<FlexColumnContainer>
					<S.Logo src={LogoImg} width='30%' />
					<SearchBox $width='50%' $radius='3rem' />
				</FlexColumnContainer>
			</Center>
		</Compressor>
	)
}

export default Home

const Logo = styled.img`
	width: 30%;
`

const FlexColumnContainer = styled.div`
	display: flex;

	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	gap: 5rem;
`

const S = {
	Logo,
	FlexColumnContainer
}