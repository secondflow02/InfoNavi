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

const SearchField = ({
	$radius = '5rem',
	$bgColor = COLOR.grayScale[1500],
	...rest
}) => {
	const [recommendedTerms, setRecommendedTerms] =
		useRecoilState(recommendedTermsAtom)
	const [focusIdx, setFocusIdx] = useRecoilState(focusIdxAtom)

	/** "왼쪽","오른쪽","엔터" 키 입력 이벤트 처리 */
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
	/** 입력창 클릭에 대한 이벤트 처리 */
	const onClickForm = () => {
		const arr = JSON.parse(localStorage.getItem(LATEST_TERMS))
		if (arr === null) return
		setRecommendedTerms([...arr])
	}
	/** 입력값 변경에 대한 이벤트 처리 */
	const onChangeForm = (e) => {
		onChangeInputLazy(e.target.value)
		setFocusIdx(-1)
	}
	/** 데이터 패칭 후, 전역상태 관리 */
	const fetchDataNRegisterWithGlobal = async (val) => {
		const result = await getRecommendedTerms(val)
		setRecommendedTerms(result)
	}

	const onChangeInputLazy = debounce(fetchDataNRegisterWithGlobal, 500)

	return (
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
	)
}

export default SearchField

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

const S = {
	FromWrapper,
	SearchInput,
	EnterButton
}
