import styled from 'styled-components'
import { BREAK_POINT, COLOR, FONT_SIZE } from '../libs/styeld-components/tokens'

const SearchBox = ({
	$width = '10%',
	$radius = '0',
	$bgColor = COLOR.grayScale[1500],
	...rest
}) => {
	return <S.SearchInput {...{ $width, $radius, $bgColor, ...rest }} />
}

export default SearchBox

const SearchInput = styled.input`
	width: ${({ $width }) => $width};
	background-color: ${({ $bgColor }) => $bgColor};
	border-radius: ${({ $radius }) => $radius};

	text-align: center;

	height: ${FONT_SIZE.lg};
	padding: 12px;
	@media screen and (max-width: ${BREAK_POINT.md}) {
		height: ${FONT_SIZE.md};
	}
	@media screen and (max-width: ${BREAK_POINT.sm}) {
		height: ${FONT_SIZE.sm};
	}
`

const S = {
	SearchInput
}
