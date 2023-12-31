import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import Center from '../components/center'
import Compressor from '../components/compressor'
import SearchBox from '../components/search-box'
import Spacer from '../components/spacer'
import TermsList from '../components/terms-list'
import { getRecommendedTerms } from '../libs/axios/searching'
import focusIdxAtom from '../libs/recoil/focus-idx'
import recommendedTermsAtom from '../libs/recoil/recommended-terms.atom'
import { COLOR } from '../libs/styeld-components/tokens'
import debounce from '../utils/debounce'
import LogoImg from '/logo/logo-766x152.webp'

const Home = () => {
	const [recommendedTerms, setRecommendedTerms] =
		useRecoilState(recommendedTermsAtom)
	const [focusIdx, setFocusIdx] = useRecoilState(focusIdxAtom)

	const onChangeForm = (e) => {
		onChangeInputLazy(e.target.value)
	}

	const onKeyUpForm = (e) => {
		if (!recommendedTerms.length) {
			setFocusIdx(-1)
			return
		}
		let nxtIdx = focusIdx
		switch (e.key) {
			case 'ArrowUp':
				nxtIdx = focusIdx <= 0 ? 0 : focusIdx - 1
				break
			case 'ArrowDown':
				nxtIdx =
					recommendedTerms.length - 1 <= focusIdx
						? recommendedTerms.length - 1
						: focusIdx + 1
				break
			case 'Enter':
				break
			default:
				return
		}
		e.target.value = recommendedTerms[nxtIdx]
		setFocusIdx(nxtIdx)
	}

	const fetchDataNRegisterWithGlobal = async (val) => {
		const result = await getRecommendedTerms(val)
		/** 전역상태로 관리 */
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
						onChange={onChangeForm}
						onKeyUp={onKeyUpForm}
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
