import styled from 'styled-components'
import { COLOR, FONT_WEIGHT } from '../libs/styeld-components/tokens'

const TermOne = ({ recommend, keyword, $radius = '1rem', $isFocus }) => {
	const arrToBeWritten = [...recommend]

	return (
		<S.Wrapper {...{ $radius, $isFocus }}>
			{arrToBeWritten.map((character, idx) =>
				keyword.includes(character) ? (
					<S.Highlight key={idx}>{character}</S.Highlight>
				) : (
					character
				)
			)}
		</S.Wrapper>
	)
}

export default TermOne

const Wrapper = styled.li`
	width: 100%;
	height: 8%;

	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	border-radius: ${({ $radius }) => $radius};
	padding-bottom: 10px;

	color: ${COLOR.grayScale[600]};
	background-color: ${({ $isFocus }) =>
		$isFocus ? COLOR.grayScale[1300] : COLOR.grayScale[1500]};
	font-weight: ${FONT_WEIGHT.thin};
	text-align: center;

	&:hover {
		cursor: pointer;
		background-color: ${COLOR.grayScale[1200]};
	}
`
const Highlight = styled.mark`
	background-color: transparent;
	font-weight: ${FONT_WEIGHT.bold};
`

const S = { Wrapper, Highlight }
