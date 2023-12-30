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
				<FlexColumnContainer>
					<S.Logo src={LogoImg} width='30%' />
					<SearchBox
						$width='50%'
						$radius='3rem'
						onChange={(e) => {
							onChangeInputLazy(e.target.value)
						}}
					/>
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
