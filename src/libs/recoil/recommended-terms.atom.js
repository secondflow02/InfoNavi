import { atom } from 'recoil'
import { RECOMMENDED_TERMS } from '../../constants/recoil-keys'

const recommendedTermsAtom = atom({
	key: RECOMMENDED_TERMS,
	default: []
})

export default recommendedTermsAtom
