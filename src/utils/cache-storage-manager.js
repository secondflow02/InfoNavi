export const searchQueryAndSave = async ({
	storageKey,
	keyword,
	axiosFunc,
	params
}) => {
	const cacheStorage = await caches.open(storageKey)
	const cachedResponse = await cacheStorage.match(keyword)
	try {
		if (cachedResponse) {
			return await cachedResponse.json()
		} else {
			const axiosResponse = await axiosFunc(...params)

			cacheStorage.put(keyword, new Response(JSON.stringify(axiosResponse)))
			return axiosResponse
		}
	} catch (e) {
		window.alert('[캐시 및 쿠키 삭제] 를 진행해주세요.')
	}
}
