import axios from 'axios'

/** 추천검색어 관련 */
export const recommendedTermsInstance = () =>
	axios.create({
		baseURL: import.meta.env.VITE_APP_SEARCHING_SERVER_URL
	})
