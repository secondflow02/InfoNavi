import styled from 'styled-components'
/**
 * @component
 * @param {string} [$width='0px'] 가로길이 (기본값: '0px')
 * @param {string} [$height=`0px`] 세로길이 (기본값:'0px')
 * @returns {JSX.Element}
 */
const Spacer = ({ $width = '0px', $height = '0px' }) => {
	return <Div_Spacer {...{ $width, $height }} />
}

export default Spacer

const Div_Spacer = styled.div`
	width: ${({ $width }) => $width};
	min-width: ${({ $width }) => $width};
	height: ${({ $height }) => $height};
	min-height: ${({ $height }) => $height};
	background-color: none;
	display: inline-block;
`
