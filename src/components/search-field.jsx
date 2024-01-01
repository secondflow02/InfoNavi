import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { LATEST_TERMS } from '../constants/local-stroage-key'
import { getRecommendedTerms } from '../libs/axios/searching'
import focusIdxAtom from '../libs/recoil/focus-idx'
import searchKeywordAtom from '../libs/recoil/search-keyword'
import { BREAK_POINT, COLOR, FONT_SIZE } from '../libs/styeld-components/tokens'
import debounce from '../utils/debounce'
import {
	getLocalStorageArr,
	resizeLocalStorageArr,
	unshiftElemToLocalStorageArr
} from '../utils/local-storage-manager'
import { adjustNumberIncludingThresholds } from '../utils/threshold'

const SearchField = ({
	$radius = '5rem',
	$bgColor = COLOR.grayScale[1500],
	...rest
}) => {
	const [focusIdx, setFocusIdx] = useRecoilState(focusIdxAtom)
	const [searchKeyword, setSearchKeywordAtom] = useRecoilState(searchKeywordAtom)
	const recommendedTerms = searchKeyword.recommendedTerms

	/** "왼쪽","오른쪽","엔터" 키 입력 이벤트 처리 */
	const onKeyUp = (e) => {
		if (!recommendedTerms.length) {
			setFocusIdx(-1)
			return
		}
		let nxtIdx = -1
		switch (e.key) {
			case 'ArrowUp':
				nxtIdx = adjustNumberIncludingThresholds({
					number: focusIdx - 1,
					lowerLimit: 0,
					upperLimit: recommendedTerms.length - 1
				})
				e.target.value = recommendedTerms[nxtIdx]
				break
			case 'ArrowDown':
				nxtIdx = adjustNumberIncludingThresholds({
					number: focusIdx + 1,
					lowerLimit: 0,
					upperLimit: recommendedTerms.length - 1
				})
				e.target.value = recommendedTerms[nxtIdx]
				break
			case 'Enter':
				const input_value = e.target.input.value.trim()
				saveInputOnLocalStorage({
					storageKey: LATEST_TERMS,
					inputValue: input_value,
					size: 5
				})
				break
			case 'Escape':
				e.target.value = ''
				setSearchKeywordAtom({ keyword: '', recommendedTerms: [] })
				break
			default:
				break
		}
		setFocusIdx(nxtIdx)
	}
	/** 입력창 클릭에 대한 이벤트 처리 */
	const onClick = () => {
		const arr = getLocalStorageArr({ storageKey: LATEST_TERMS })
		setSearchKeywordAtom((prev) => {
			return { ...prev, recommendedTerms: [...arr] }
		})
	}
	/** 입력값 변경에 대한 이벤트 처리 */
	const onChange = (e) => {
		onChangeInputLazy(e.target.value)
		setFocusIdx(-1)
	}
	/** submit 이벤트 (버튼 클릭 등) 처리 */
	const onSubmit = (e) => {
		e.preventDefault()
		const input_value = e.target.input.value.trim()
		saveInputOnLocalStorage({
			storageKey: LATEST_TERMS,
			inputValue: input_value,
			size: 5
		})
	}
	/** 데이터 패칭 후, 전역상태 관리 */
	const fetchDataNRegisterWithGlobal = async (val) => {
		const result = await getRecommendedTerms(val)
		setSearchKeywordAtom({ keyword: val, recommendedTerms: result })
	}
	/** fetchDataNRegisterWithGlobal 지연실행 로직 */
	const onChangeInputLazy = debounce(fetchDataNRegisterWithGlobal, 300)
	/** 로컬스토리지 저장 로직 */
	const saveInputOnLocalStorage = ({ storageKey, inputValue, size }) => {
		if (inputValue === '') return
		unshiftElemToLocalStorageArr({
			storageKey: storageKey,
			element: inputValue
		})
		resizeLocalStorageArr({
			storageKey: storageKey,
			size
		})
	}

	return (
		<S.FromWrapper
			{...{ $radius, $bgColor, ...rest }}
			{...{ onClick, onChange, onSubmit, onKeyUp }}
		>
			<S.SearchInput name='input' />
			<S.EnterButton type='submit'>🔎</S.EnterButton>
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
