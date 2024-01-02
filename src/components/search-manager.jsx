import { useRef, useState } from 'react'
import styled from 'styled-components'
import SearchField from './search-field'
import TermsList from './terms-list'

const SearchManager = ({ $width }) => {
	const [searchKeyword, setSearchKeyword] = useState('') // 검색 키워드
	const [recommendArr, setRecommendArr] = useState([]) // 추천 검색어 배열
	const [focusIdx, setFocusIdx] = useState(-1) // 추천 검색 배열 상, 포커스된 항목의 index

	const formref = useRef() // input 창을 포함한 form 태그 추적

	return (
		<S.Container {...{ $width }}>
			<SearchField
				{...{ recommendArr, focusIdx }} // 상태값
				{...{ setSearchKeyword, setRecommendArr, setFocusIdx }} // 상태변경 함수
				{...{ formref }} // ref
			/>
			<S.AbsoluteWrapper>
				<TermsList
					{...{ searchKeyword, recommendArr, focusIdx }} // 상태값
					{...{ setSearchKeyword, setRecommendArr }} // 상태변경 함수
					{...{ formref }} // ref
				/>
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
