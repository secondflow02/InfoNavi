import styled from 'styled-components'
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '../libs/styeld-components/tokens'

const TermOne = ({ term, $radius = '1rem', $isFocus }) => {
	return <S.Wrapper {...{ $radius, $isFocus }}>{term}</S.Wrapper>
}

export default TermOne

const Wrapper = styled.li`
	width: 100%;
	height: 10%;

	font-weight: ${FONT_WEIGHT.thin};

	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;

	height: ${FONT_SIZE.md};

	border-radius: ${({ $radius }) => $radius};
	padding-bottom: 8px;

	background-color: ${({ $isFocus }) =>
		$isFocus ? COLOR.grayScale[1300] : COLOR.grayScale[1500]};

	&:hover {
		cursor: pointer;
		background-color: ${COLOR.grayScale[1200]};
	}
`
const S = { Wrapper }
