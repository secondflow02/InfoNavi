import { useState } from 'react'

const useFetchAndManageGlobally = ({ fetchFunc, setGlobalState }) => {
	const [keyword, setKeyword] = useState('')

	let data
	const getFetchResult = async () => {
		data = await fetchFunc(keyword)
		setGlobalState(data)
	}

	getFetchResult()
	return { data, keyword, setKeyword }
}

export default useFetchAndManageGlobally
