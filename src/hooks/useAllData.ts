import { useBoardData } from './useBoardData'
import { useBuzzerData } from './useBuzzerData'
import { useQuestionData } from './useQuestionData'
import { useRoomData } from './useRoomData'

export const useAllData = (): void => {
	useBoardData()
	useBuzzerData()
	useRoomData()
	useQuestionData()
}