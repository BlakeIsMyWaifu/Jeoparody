import { useQuestionStore } from 'state/questionStore'
import { trpc } from 'utils/trpc'

export const useQuestionPlayerData = (): boolean => {

	const setQuestion = useQuestionStore(state => state.setQuestion)
	const question = useQuestionStore(state => state.question)

	trpc.question.onSelectQuestion.useSubscription(undefined, { onData: setQuestion })

	return !!question
}