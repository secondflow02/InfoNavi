import styled from 'styled-components'
import { BREAK_POINT, COLOR, FONT_SIZE } from '../libs/styeld-components/tokens'

const SearchBox = ({
	$width = '10%',
	$radius = '0',
	$bgColor = COLOR.grayScale[1500],
	...rest
}) => {
	// return <S.SearchInput {...{ $width, $radius, $bgColor, ...rest }} />

	return (
		<S.FromWrapper
			{...{ $width, $radius, $bgColor, ...rest }}
			onClick={(e) => {
				e.preventDefault()
			}}
		>
			<S.SearchInput />
			<S.EnterButton>🔎</S.EnterButton>
		</S.FromWrapper>
	)
}

export default SearchBox

const FromWrapper = styled.form`
	width: ${({ $width }) => $width};
	background-color: ${({ $bgColor }) => $bgColor};
	border: 2px solid black;
	border-radius: ${({ $radius }) => $radius};

	display: flex;
	justify-content: space-between;
	align-items: center;

	height: ${FONT_SIZE.lg};
	padding: 10px;
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
