import styled, { css, keyframes } from 'styled-components'
import { LATEST_TERMS } from '../constants/local-stroage-key'
import { COLOR, FONT_WEIGHT } from '../libs/styeld-components/tokens'
import { isThisOneInLocalStorageArr } from '../utils/local-storage-manager'

const TermOne = ({ recommend, keyword, $radius = '1rem', $isFocus, ...rest }) => {
	const arrToBeWritten = [...recommend] // 출력될 문자열을 배열로 변환 (map() 적용 목적)

	if (arrToBeWritten.length === 0) return <></>

	return (
		<S.Wrapper {...{ $radius, $isFocus, ...rest }}>
			{isThisOneInLocalStorageArr({
				storageKey: LATEST_TERMS,
				checkElem: recommend
			})
				? '🌀 '
				: ''}

			{arrToBeWritten.map((character, idx) =>
				keyword.includes(character) ? (
					<S.Highlight key={idx}>{character}</S.Highlight>
				) : (
					character
				)
			)}
		</S.Wrapper>
	)
}

export default TermOne

const slideToLeft = keyframes`
  from {
    transform: translateX(0.5%) scale(1);
  }
  to {
    transform: translateX(-0.5%) scaleY(1.1);
  }
`

const Wrapper = styled.li`
	width: 95%;
	height: 8%;

	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	animation: ${slideToLeft} 300ms ease-in-out infinite alternate;
	animation-play-state: paused;

	border-radius: ${({ $radius }) => $radius};
	padding-bottom: 10px;

	color: ${COLOR.grayScale[600]};
	font-weight: ${FONT_WEIGHT.thin};
	text-align: center;

	${({ $isFocus }) =>
		$isFocus
			? css`
					background-color: ${COLOR.grayScale[1300]};
					animation-play-state: running;
				`
			: css`
					background-color: 'transparent';
				`}

	&:hover {
		cursor: pointer;
		background-color: ${COLOR.grayScale[1200]};
		animation-play-state: running;
	}
`
const Highlight = styled.mark`
	background-color: transparent;
	font-weight: ${FONT_WEIGHT.bold};
`

const S = { Wrapper, Highlight }
