import styled from 'styled-components'
import { CACHE_RECOMMEND_TERMS } from '../constants/cache-storage-key'
import { LATEST_TERMS } from '../constants/local-stroage-key'
import { getRecommendedTerms } from '../libs/axios/searching'
import { BREAK_POINT, COLOR, FONT_SIZE } from '../libs/styeld-components/tokens'
import { searchQueryAndSave } from '../utils/cache-storage-manager'
import { debounce } from '../utils/debounce'
import {
	getLocalStorageArr,
	resizeLocalStorageArr,
	unshiftElemToLocalStorageArr
} from '../utils/local-storage-manager'
import { adjustNumberIncludingThresholds } from '../utils/threshold'

const SearchField = ({
	setSearchKeyword,
	recommendArr,
	setRecommendArr,
	focusIdx,
	setFocusIdx,
	formref,
	$radius = '5rem',
	$bgColor = COLOR.grayScale[1500],
	...rest
}) => {
	/** "왼쪽","오른쪽","Enter",'ESC' 키 입력 이벤트 처리 */
	const onKeyUp = (e) => {
		if (!recommendArr.length) {
			setFocusIdx(-1)
			return
		}
		let nxtIdx = -1
		switch (e.key) {
			case 'ArrowUp':
				nxtIdx = adjustNumberIncludingThresholds({
					number: focusIdx - 1,
					lowerLimit: 0,
					upperLimit: recommendArr.length - 1
				})
				e.target.value = recommendArr[nxtIdx]
				break
			case 'ArrowDown':
				nxtIdx = adjustNumberIncludingThresholds({
					number: focusIdx + 1,
					lowerLimit: 0,
					upperLimit: recommendArr.length - 1
				})
				e.target.value = recommendArr[nxtIdx]
				break
			case 'Enter':
				const inputValue = e.target.value.trim()
				if (inputValue === '') {
					showLocalStorageArr({ storageKey: LATEST_TERMS })
					break
				}
				saveInputOnLocalStorage({
					storageKey: LATEST_TERMS,
					inputValue: inputValue,
					size: 5
				})
				setSearchKeyword(inputValue)
				setRecommendArr([inputValue])
				window.alert(`"${inputValue}" 에 대한 검색결과 페이지로 이동.. 🛫`)
				break
			case 'Escape':
				e.target.value = ''
				setSearchKeyword('')
				setRecommendArr([])
				break
			default:
				break
		}
		setFocusIdx(nxtIdx)
	}
	/** 입력창 클릭에 대한 이벤트 처리 */
	const onClick = () => {
		if (formref.current.input.value === '')
			showLocalStorageArr({ storageKey: LATEST_TERMS })
	}
	/** 입력값 변경에 대한 이벤트 처리 */
	const onChange = (e) => {
		onChangeInputLazy(e.target.value)
		setFocusIdx(-1)
	}
	/** submit 이벤트 (버튼 클릭 등) 처리 */
	const onSubmit = (e) => {
		e.preventDefault()
		const inputValue = e.target.input.value.trim()
		if (formref.current.input.value === '') return
		saveInputOnLocalStorage({
			storageKey: LATEST_TERMS,
			inputValue: inputValue,
			size: 5
		})
		window.alert(`"${inputValue}" 에 대한 검색결과 페이지로 이동.. 🛫`)
	}
	/** 데이터 패칭 후, 상태 관리 */
	const fetchDataNRegisterWithState = async (keyword) => {
		const result = await searchQueryAndSave({
			storageKey: CACHE_RECOMMEND_TERMS,
			keyword: keyword,
			axiosFunc: getRecommendedTerms,
			params: [{ key: keyword }]
		})
		setSearchKeyword(keyword)
		setRecommendArr(result)
	}
	/** fetchDataNRegisterWithState 지연실행 로직 */
	const onChangeInputLazy = debounce({
		callbackFunc: fetchDataNRegisterWithState,
		delay: 300
	})
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
	/** 로컬스토리지에 저장된 배열 값을 스크린에 전시 */
	const showLocalStorageArr = ({ storageKey }) => {
		const arr = getLocalStorageArr({ storageKey })
		setRecommendArr([...arr])
	}

	return (
		<S.FromWrapper
			{...{ $radius, $bgColor, ...rest }}
			{...{ onClick, onChange, onSubmit, onKeyUp }}
			ref={formref}
		>
			<S.SearchInput name='input' type='text' autoComplete='off' />
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
