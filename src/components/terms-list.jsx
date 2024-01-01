import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import focusIdxAtom from '../libs/recoil/focus-idx'
import searchKeywordAtom from '../libs/recoil/search-keyword'
import { COLOR } from '../libs/styeld-components/tokens'
import TermOne from './term-one'

const TermsList = ({ $width = '100%', $radius = '1rem' }) => {
	const searchKeyword = useRecoilValue(searchKeywordAtom)
	const focusIdx = useRecoilValue(focusIdxAtom)

	const keyword = searchKeyword.keyword
	const recommendedTerms = searchKeyword.recommendedTerms

	if (!recommendedTerms.length) return <></>

	return (
		<S.TermsContainer {...{ $width, $radius }}>
			{recommendedTerms.map((recommend, idx) => {
				if (idx >= 7) return
				return (
					<TermOne
						key={idx}
						keyword={keyword}
						recommend={recommend}
						$isFocus={idx === focusIdx}
					/>
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

	background-color: ${COLOR.grayScale[1500]};

	display: flex;
	flex-direction: column;
	justify-content: center;

	gap: 5px;
`

const S = {
	TermsContainer
}
