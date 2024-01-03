import styled, { css } from 'styled-components'
import { COLOR } from '../libs/styeld-components/tokens'

const Center = ({
	$bgColor = 'transparent',
	$radius = '0',
	$variant = 'default',
	children,
	...rest
}) => {
	return (
		<S.Container {...{ $bgColor, $radius, $variant, ...rest }}>
			{children}
		</S.Container>
	)
}

export default Center

const variantCSS = {
	default: css``,
	outline: css`
		border: 1px solid ${COLOR.grayScale[1200]};
	`
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${({ $bgColor }) => $bgColor};
	border-radius: ${({ $radius }) => $radius};

	${({ $variant }) => variantCSS[$variant]}
`

const S = { Container }
