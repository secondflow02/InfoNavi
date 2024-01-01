import styled from 'styled-components'
import SearchField from './search-field'
import TermsList from './terms-list'

const SearchBox = ({ $width }) => {
	return (
		<S.Container {...{ $width }}>
			<SearchField />
			<S.AbsoluteWrapper>
				<TermsList />
			</S.AbsoluteWrapper>
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

const AbsoluteWrapper = styled.div`
	position: absolute;
	width: 100%;
	transform: translateY(3.5rem);
`

const S = { Container, AbsoluteWrapper }
