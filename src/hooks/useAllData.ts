import { useBoardData } from './useBoardData'
import { useBuzzerData } from './useBuzzerData'
import { usePlayerData } from './usePlayerData'
import { useQuestionData } from './useQuestionData'

export const useAllData = (): void => {
	useBoardData()
	useBuzzerData()
	usePlayerData()
	useQuestionData()
}