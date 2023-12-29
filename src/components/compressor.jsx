import styled, { css } from 'styled-components'

/**
 * @param {string} $rowCompressibility 횡(좌우) 압축률 (기본단위: %)
 * @param {string} $colCompressibility 종(상하) 압축률 (기본단위: %)
 * @description 부모로부터 이격 생성
 */
const Compressor = ({
	$rowCompressibility = '25%',
	$colCompressibility = '10%',
	$bgColor = 'transparent',
	children,
	...rest
}) => {
	return (
		<S.Wrapper
			{...{ $rowCompressibility, $colCompressibility, $bgColor, ...rest }}
		>
			{children}
		</S.Wrapper>
	)
}

export default Compressor

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	${({ $colCompressibility, $rowCompressibility }) => css`
		padding: ${$colCompressibility} ${$rowCompressibility};
	`}

	background-color: ${({ $bgColor }) => $bgColor};
`

const S = { Wrapper }
