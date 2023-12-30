import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import recommendedTermsAtom from '../libs/recoil/recommended-terms.atom'
import { COLOR } from '../libs/styeld-components/tokens'
import TermOne from './term-one'

const TermsList = ({ $width = '10%' }) => {
	const recommendedTerms = useRecoilValue(recommendedTermsAtom)
	return (
		<S.TermsContainer {...{ $width }}>
			{recommendedTerms.map((term, idx) => {
				if (idx >= 7) return
				return <TermOne key={idx} term={term}></TermOne>
			})}
		</S.TermsContainer>
	)
}

export default TermsList

const TermsContainer = styled.ul`
	width: ${({ $width }) => $width};
	height: fit-content;

	border: 1px solid ${COLOR.grayScale[0]};
	border-radius: 1rem;
`

const S = {
	TermsContainer
}
