import { recommendedTermsInstance } from './base'

export const getRecommendedTerms = async (key) => {
	let response

	try {
		response = await recommendedTermsInstance().get('/search', {
			params: { key }
		})
	} catch (error) {
		response = error.response
	}
	console.log(response.data)
	return response.data
}
