import styled from 'styled-components'
import { LATEST_TERMS } from '../constants/local-stroage-key'
import { COLOR } from '../libs/styeld-components/tokens'
import {
	resizeLocalStorageArr,
	unshiftElemToLocalStorageArr
} from '../utils/local-storage-manager'
import TermOne from './term-one'

const TermsList = ({
	searchKeyword,
	recommendArr,
	focusIdx,
	setSearchKeyword,
	setRecommendArr,
	formref,
	$radius = '1rem',
	...rest
}) => {
	if (!recommendArr?.length) return <></>

	/**
	 * @param {string} recommendOne
	 * @description
	 * - TermOne 컴포넌트 클릭 시 이벤트 처리
	 * - localStorage 에 `recommendOne` 저장
	 * - `recommendOne` 을 입력창에 삽입
	 * - `recommendOne` 한 개의 요소를 가진 배열로 recommendArr 교체
	 * - `recommendOne` 를 keyword 로 등록 => mark 효과를 받기 위함
	 */
	const onClickTermOne = ({ recommendOne }) => {
		formref.current.input.value = recommendOne
		unshiftElemToLocalStorageArr({
			storageKey: LATEST_TERMS,
			element: recommendOne
		})
		resizeLocalStorageArr({
			storageKey: LATEST_TERMS,
			size: 5
		})
		setSearchKeyword(recommendOne)
		setRecommendArr([recommendOne])
		window.alert(`"${recommendOne}" 에 대한 검색결과 페이지로 이동.. 🛫`)
	}

	return (
		<S.TermsContainer {...{ $radius, ...rest }}>
			{recommendArr.map((recommendOne, idx) => {
				if (idx >= 7) return
				return (
					<TermOne
						key={idx}
						keyword={searchKeyword}
						recommend={recommendOne}
						onClick={() => {
							onClickTermOne({ recommendOne })
						}}
						$isFocus={idx === focusIdx}
					/>
				)
			})}
		</S.TermsContainer>
	)
}

export default TermsList

const TermsContainer = styled.ul`
	width: 100%;
	height: fit-content;
	padding: 3px;

	border: 1px solid ${COLOR.grayScale[0]};
	border-radius: ${({ $radius }) => $radius};

	background-color: ${COLOR.grayScale[1500]};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	gap: 5px;
`

const S = {
	TermsContainer
}
