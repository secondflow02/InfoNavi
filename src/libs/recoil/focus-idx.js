import { atom } from 'recoil'
import { FOCUS_IDX } from '../../constants/recoil-keys'

const focusIdxAtom = atom({
	key: FOCUS_IDX,
	default: -1
})

export default focusIdxAtom
