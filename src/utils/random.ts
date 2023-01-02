export const randomArrayElement = <T>(array: T[]): T | null => {
	return array[~~(Math.random() * array.length)] ?? null
}

interface Item<T> {
	data: T;
	weight: number;
}

export const weightedRandomData = <T>(items: Item<T>[]): T | null => {

	const weights: number[] = items.map(item => item.weight)
	const cumulativeWeights: number[] = []

	if (!weights.length) return null

	weights.forEach((weight, i) => {
		cumulativeWeights[i] = weight + (cumulativeWeights[i - 1] || 0)
	})

	const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1]
	const randomNumber = maxCumulativeWeight * Math.random()

	for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
		if (cumulativeWeights[itemIndex] >= randomNumber) {
			return items[itemIndex].data
		}
	}

	return items[0].data
}