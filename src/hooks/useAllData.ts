import { useBoardData } from './useBoardData'
import { useBuzzerData } from './useBuzzerData'
import { useHostStatusData } from './useHostStatusData'
import { usePlayerData } from './usePlayerData'
import { useQuestionData } from './useQuestionData'

export const useAllData = (): void => {
	useBoardData()
	useBuzzerData()
	useHostStatusData()
	usePlayerData()
	useQuestionData()
}