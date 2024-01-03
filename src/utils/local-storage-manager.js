/**
 * @param {string} storageKey localStorage key
 * @description
 * - 로컬스토리지에 배열 형태로 저장된 특정 값을 `storageKey` 로 찾아, 해당 배열을 반환
 */
export const getLocalStorageArr = ({ storageKey }) => {
	const getArr = JSON.parse(localStorage.getItem(storageKey))
	const newArr = []
	if (getArr !== null) newArr.push(...getArr)
	return newArr
}
/**
 * @param {string} storageKey localStorage key
 * @param {number} element 추가될 요소
 * @description
 * - 로컬스토리지에 배열 형태로 저장된 특정 값을 `storageKey` 로 찾아, `element` 를 해당 배열에 추가
 * - 배열의 앞 (인덱스 0) 에 추가
 */
export const unshiftElemToLocalStorageArr = ({ storageKey, element }) => {
	let saveArr = getLocalStorageArr({ storageKey })
	saveArr.unshift(element)
	saveArr = [...new Set(saveArr)]
	localStorage.setItem(storageKey, JSON.stringify(saveArr))
}
/**
 * @param {string} storageKey localStorage key
 * @param {number} size 조정될 배열의 크기
 * @description
 * - 로컬스토리지에 배열 형태로 저장된 특정 값을 `storageKey` 로 찾아, `size` 만큼 배열 길이를 조정
 * - 인덱스 0 부터 `size` 만큼 잘라, 다시 localStorage 에 저장
 */
export const resizeLocalStorageArr = ({ storageKey, size }) => {
	let saveArr = getLocalStorageArr({ storageKey })
	saveArr.splice(size)
	localStorage.setItem(storageKey, JSON.stringify(saveArr))
}
/**
 * @param {string} storageKey localStorage key
 * @param {*} checkElem 배열 안에 있는지 확인해야 할 요소
 * @description
 * - 로컬스토리지에 배열 형태로 저장된 특정 값을 `storageKey` 로 찾아, `checkElem` 가 해당 배열에 포함되어 있는지 확인
 */
export const isThisOneInLocalStorageArr = ({ storageKey, checkElem }) => {
	const findArr = getLocalStorageArr({ storageKey })
	return findArr.includes(checkElem)
}
