import styled from 'styled-components'
import Center from '../components/center'
import Compressor from '../components/compressor'
import SearchBox from '../components/search-box'
import { getRecommendedTerms } from '../libs/axios/searching'
import recommendedTermsAtom from '../libs/recoil/recommended-terms.atom'
import { COLOR } from '../libs/styeld-components/tokens'
import debounce from '../utils/debounce'
import LogoImg from '/logo/logo-766x152.webp'

import { useSetRecoilState } from 'recoil'
import Spacer from '../components/spacer'
import TermsList from '../components/terms-list'

const Home = () => {
	const setRecommendedTerms = useSetRecoilState(recommendedTermsAtom)

	const fetchDataNRegisterWithGlobal = async (val) => {
		const result = await getRecommendedTerms(val)
		setRecommendedTerms(result)
	}

	const onChangeInputLazy = debounce(fetchDataNRegisterWithGlobal, 500)

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
					<SearchBox
						$width='50%'
						$radius='3rem'
						onChange={(e) => {
							onChangeInputLazy(e.target.value)
						}}
					/>
					<TermsList $width='50%' />
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
