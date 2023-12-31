import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import focusIdxAtom from '../libs/recoil/focus-idx'
import recommendedTermsAtom from '../libs/recoil/recommended-terms.atom'
import { COLOR } from '../libs/styeld-components/tokens'
import TermOne from './term-one'

const TermsList = ({ $width = '10%', $radius = '1rem' }) => {
	const recommendedTerms = useRecoilValue(recommendedTermsAtom)
	const focusIdx = useRecoilValue(focusIdxAtom)

	if (!recommendedTerms.length) return <></>

	return (
		<S.TermsContainer {...{ $width, $radius }}>
			{recommendedTerms.map((term, idx) => {
				if (idx >= 7) return
				return (
					<TermOne key={idx} term={term} $isFocus={idx === focusIdx}></TermOne>
				)
			})}
		</S.TermsContainer>
	)
}

export default TermsList

const TermsContainer = styled.ul`
	width: ${({ $width }) => $width};
	height: fit-content;

	border: 1px solid ${COLOR.grayScale[0]};
	border-radius: ${({ $radius }) => $radius};

	display: flex;
	flex-direction: column;
	justify-content: center;

	gap: 5px;
`

const S = {
	TermsContainer
}
