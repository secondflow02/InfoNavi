import { atom } from 'recoil'
import { SEARCH_KEYWORD } from '../../constants/recoil-keys'

const searchKeywordAtom = atom({
	key: SEARCH_KEYWORD,
	default: {
		keyword: '',
		recommendedTerms: []
	}
})

export default searchKeywordAtom
