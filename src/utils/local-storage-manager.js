const getLocalStorageArr = ({ storageKey }) => {
	const getArr = JSON.parse(localStorage.getItem(storageKey))
	const newArr = []
	if (getArr !== null) newArr.push(...getArr)
	return newArr
}

const unshiftElemToLocalStorageArr = ({ storageKey, element }) => {
	let saveArr = getLocalStorageArr({ storageKey })
	saveArr.unshift(element)
	saveArr = [...new Set(saveArr)]
	localStorage.setItem(storageKey, JSON.stringify(saveArr))
}

/**
 * @param {string} storageKey : localStorage key
 * @param {number} size : 조정될 배열의 크기
 */
const resizeLocalStorageArr = ({ storageKey, size }) => {
	let saveArr = getLocalStorageArr({ storageKey })
	saveArr.splice(size)
	localStorage.setItem(storageKey, JSON.stringify(saveArr))
}

export { resizeLocalStorageArr, unshiftElemToLocalStorageArr }
