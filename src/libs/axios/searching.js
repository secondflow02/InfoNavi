import { recommendedTermsInstance } from './base'

export const getRecommendedTerms = async (key) => {
	const response = await recommendedTermsInstance().get('/search', {
		params: { key }
	})
	return response.data
}
