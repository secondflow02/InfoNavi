import styled from 'styled-components'
import { COLOR } from '../libs/styeld-components/tokens'
import TermOne from './term-one'

const TermsList = ({
	searchKeyword,
	recommendArr,
	focusIdx,
	formref,
	$radius = '1rem',
	...rest
}) => {
	if (!recommendArr?.length) return <></>

	console.log(formref.current.input.value)

	return (
		<S.TermsContainer {...{ $radius, ...rest }}>
			{recommendArr.map((recommendOne, idx) => {
				if (idx >= 7) return
				return (
					<TermOne
						key={idx}
						keyword={searchKeyword}
						recommend={recommendOne}
						onClick={() => {
							formref.current.input.value = recommendOne
						}}
						$isFocus={idx === focusIdx}
					/>
				)
			})}
		</S.TermsContainer>
	)
}

export default TermsList

const TermsContainer = styled.ul`
	width: 100%;
	height: fit-content;

	border: 1px solid ${COLOR.grayScale[0]};
	border-radius: ${({ $radius }) => $radius};

	background-color: ${COLOR.grayScale[1500]};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	gap: 5px;
`

const S = {
	TermsContainer
}
