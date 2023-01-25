export const arrayToObject = <T>(array: [string, T][]): Record<string, T> => {
	return array.reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {})
}