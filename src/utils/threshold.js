/**
 * @param {number} number 상한과 하한 범위 내부의 값인지 확인해야 할 숫자
 * @param {number} upperLimit 상한값
 * @param {number} lowerLimit 하한값
 * @description
 * - 전달받은 숫자가 하한 부터 상한 범위 이내인지를 판단하여(경계 포함), 그렇다면 그대로 반환
 * - number 의 값이 하한보다 작다면 반환값을 하한으로 조정
 * - number 의 값이 상한보다 크다면 반환값을 상한으로 조정
 */
export const adjustNumberIncludingThresholds = ({
	number,
	upperLimit,
	lowerLimit
}) => {
	if (upperLimit < lowerLimit) throw new Error('parameters are not appropriate.')
	if (number > upperLimit) return upperLimit
	if (number < lowerLimit) return lowerLimit
	return number
}
