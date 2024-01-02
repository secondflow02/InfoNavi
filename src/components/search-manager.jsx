import { useState } from 'react'
import styled from 'styled-components'
import SearchField from './search-field'
import TermsList from './terms-list'

const SearchManager = ({ $width }) => {
	const [searchKeyword, setSearchKeyword] = useState('') // 검색 키워드
	const [recommendArr, setRecommendArr] = useState([]) // 추천 검색어 배열
	const [focusIdx, setFocusIdx] = useState(-1) // 추천 검색 배열 상, 포커스된 항목의 index

	return (
		<S.Container {...{ $width }}>
			<SearchField
				{...{
					setSearchKeyword,
					recommendArr,
					setRecommendArr,
					focusIdx,
					setFocusIdx
				}}
			/>
			<S.AbsoluteWrapper>
				<TermsList {...{ searchKeyword, recommendArr, focusIdx }} />
			</S.AbsoluteWrapper>
		</S.Container>
	)
}

export default SearchManager

const Container = styled.div`
	position: relative;
	width: ${({ $width }) => $width};
	height: 12rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`

const AbsoluteWrapper = styled.div`
	position: absolute;
	width: 100%;
	transform: translateY(3.5rem);
`

const S = { Container, AbsoluteWrapper }
