import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { LATEST_TERMS } from '../constants/local-stroage-key'
import { getRecommendedTerms } from '../libs/axios/searching'
import focusIdxAtom from '../libs/recoil/focus-idx'
import recommendedTermsAtom from '../libs/recoil/recommended-terms.atom'
import { BREAK_POINT, COLOR, FONT_SIZE } from '../libs/styeld-components/tokens'
import debounce from '../utils/debounce'
import {
	resizeLocalStorageArr,
	unshiftElemToLocalStorageArr
} from '../utils/local-storage-manager'
import TermsList from './terms-list'

const SearchBox = ({
	$width = '10%',
	$radius = '0',
	$bgColor = COLOR.grayScale[1500],
	...rest
}) => {
	const [recommendedTerms, setRecommendedTerms] =
		useRecoilState(recommendedTermsAtom)
	const [focusIdx, setFocusIdx] = useRecoilState(focusIdxAtom)
	const onChangeForm = (e) => {
		onChangeInputLazy(e.target.value)
		setFocusIdx(-1)
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
				e.target.value = recommendedTerms[nxtIdx]
				break
			case 'ArrowDown':
				nxtIdx =
					recommendedTerms.length - 1 <= focusIdx
						? recommendedTerms.length - 1
						: focusIdx + 1
				e.target.value = recommendedTerms[nxtIdx]
				break
			case 'Enter':
				const input_value = e.target.value.trim()
				if (input_value == '') return
				unshiftElemToLocalStorageArr({
					storageKey: LATEST_TERMS,
					element: input_value
				})
				resizeLocalStorageArr({
					storageKey: LATEST_TERMS,
					size: 5
				})
				setRecommendedTerms([input_value])
				return
			default:
				return
		}
		setFocusIdx(nxtIdx)
	}

	const onClickForm = () => {
		const arr = JSON.parse(localStorage.getItem(LATEST_TERMS))
		if (arr === null) return
		setRecommendedTerms([...arr])
	}

	const fetchDataNRegisterWithGlobal = async (val) => {
		const result = await getRecommendedTerms(val)
		/** 전역상태로 관리 */
		setRecommendedTerms(result)
	}

	const onChangeInputLazy = debounce(fetchDataNRegisterWithGlobal, 500)

	return (
		<S.Container {...{ $width }}>
			<S.FromWrapper
				{...{ $radius, $bgColor, ...rest }}
				onSubmit={(e) => {
					e.preventDefault()
				}}
				onClick={onClickForm}
				onChange={onChangeForm}
				onKeyUp={onKeyUpForm}
			>
				<S.SearchInput />
				<S.EnterButton>🔎</S.EnterButton>
			</S.FromWrapper>

			<S.SearchGuide>
				<TermsList $width='100%' />
			</S.SearchGuide>
		</S.Container>
	)
}

export default SearchBox

const Container = styled.div`
	position: relative;
	width: ${({ $width }) => $width};
	height: 12rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`

const FromWrapper = styled.form`
	width: 100%;
	background-color: ${({ $bgColor }) => $bgColor};
	border: 2px solid black;
	border-radius: ${({ $radius }) => $radius};

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 10px;
	height: ${FONT_SIZE.lg};
	@media screen and (max-width: ${BREAK_POINT.md}) {
		height: ${FONT_SIZE.md};
	}
	@media screen and (max-width: ${BREAK_POINT.sm}) {
		height: ${FONT_SIZE.sm};
	}
`

const SearchInput = styled.input`
	width: 85%;
	background-color: transparent;
	border: none;
`

const EnterButton = styled.button`
	min-width: 10%;
	border-radius: 10rem;
	background-color: ${COLOR.grayScale[1300]};

	transition: background-color 0.15s ease-in-out;
	&:hover {
		background-color: ${COLOR.grayScale[1100]};
	}
`

const SearchGuide = styled.div`
	position: absolute;
	width: 100%;
	transform: translateY(3.5rem);
`

const S = { Container, FromWrapper, SearchInput, EnterButton, SearchGuide }
