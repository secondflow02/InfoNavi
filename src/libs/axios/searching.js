import { recommendedTermsInstance } from './base'

export const getRecommendedTerms = async ({ key }) => {
	try {
		const response = await recommendedTermsInstance().get('/search', {
			params: { key }
		})
		return response.data
	} catch (error) {
		return [error.response.data]
	}
}
