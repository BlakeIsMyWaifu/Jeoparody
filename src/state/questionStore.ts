import type { QuestionSafe } from 'server/trpc/state/boardStore'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface QuestionStore {
	question: string | null;
	image?: string | null;

	setQuestion: (fullQuestion: QuestionSafe | null) => void;
}

export const useQuestionStore = create<QuestionStore>()(devtools(set => ({
	question: null,
	image: null,

	setQuestion: fullQuestion => {

		const { question, image } = fullQuestion ?? { question: null, image: null }

		set({
			question,
			image
		})
	}
}), { name: 'Question' }))