import { useBoardStore } from 'state/boardClientStore'
import { trpc } from 'utils/trpc'

export const useQuestionData = (): void => {

	const setQuestion = useBoardStore(state => state.setQuestion)

	trpc.question.onSelectQuestion.useSubscription(undefined, { onData: setQuestion })
	trpc.question.getQuestion.useQuery(undefined, { onSuccess: setQuestion })

	const setDailyDoubleWager = useBoardStore(state => state.setDailyDoubleWager)

	trpc.points.onUpdateWager.useSubscription(undefined, { onData: setDailyDoubleWager })
	trpc.points.getWager.useQuery(undefined, { onSuccess: setDailyDoubleWager })
}