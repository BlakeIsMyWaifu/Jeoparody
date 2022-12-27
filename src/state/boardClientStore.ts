import { type QuestionSafe } from 'server/trpc/state/boardServerStore'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { boardActionName } from './createActionName'

interface QuestionStore {
	board: Record<string, boolean[]>;
	question: string | null;
	image?: string | null;

	setBoard: (board: Record<string, boolean[]>) => void;
	setQuestion: (fullQuestion: QuestionSafe | null) => void;
}

export const useBoardStore = create<QuestionStore>()(devtools(set => ({
	board: {},
	question: null,
	image: null,

	setBoard: board => {
		set({ board }, ...boardActionName('setBoard'))
	},
	setQuestion: fullQuestion => {
		const { question, image } = fullQuestion ?? { question: null, image: null }
		set({
			question,
			image
		}, ...boardActionName('setQuestion'))
	}
}), { name: 'Board' }))