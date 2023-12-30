import styled from 'styled-components'
import { FONT_SIZE, FONT_WEIGHT } from '../libs/styeld-components/tokens'

const TermOne = ({ term }) => {
	return (
		<S.Wrapper>
			<Span>{term}</Span>
		</S.Wrapper>
	)
}

export default TermOne

const Wrapper = styled.li`
	width: 100%;
	height: 10%;

	font-weight: ${FONT_WEIGHT.thin};

	margin-bottom: 5px;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;

	padding-bottom: 3px;
	height: ${FONT_SIZE.md};
`

const Span = styled.span``

const S = { Wrapper }
