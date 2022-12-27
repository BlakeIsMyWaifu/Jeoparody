import { useBoardStore } from 'state/boardClientStore'
import { trpc } from 'utils/trpc'

export const useQuestionData = (): void => {

	const setQuestion = useBoardStore(state => state.setQuestion)

	trpc.question.onSelectQuestion.useSubscription(undefined, { onData: setQuestion })
	trpc.question.getQuestion.useQuery(undefined, { onSuccess: setQuestion })
}