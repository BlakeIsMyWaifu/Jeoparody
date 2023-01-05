import { type CompleteQuestionSafe } from 'server/trpc/state/boardServerStore'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { boardActionName } from './createActionName'

interface QuestionStore {
	board: Record<string, boolean[]>;
	question: CompleteQuestionSafe;
	lastRoundWinner: string | null;
	dailyDoubleWager: number;
	boardScale: number;

	setBoard: (board: Record<string, boolean[]>) => void;
	setQuestion: (fullQuestion: CompleteQuestionSafe) => void;
	setDailyDoubleWager: (amount: number) => void;
	setLastRoundWinner: (playerName: string | null) => void;
	setBoardScale: (scale: number) => void;
}

export const useBoardStore = create<QuestionStore>()(devtools(set => ({
	board: {},
	question: {
		question: null,
		image: null,
		dailyDouble: null
	},
	lastRoundWinner: null,
	dailyDoubleWager: 0,
	boardScale: 200,

	setBoard: board => {
		set({ board }, ...boardActionName('setBoard'))
	},
	setQuestion: ({ question, image, dailyDouble }) => {
		set({
			question: {
				question,
				image,
				dailyDouble
			}
		}, ...boardActionName('setQuestion'))
	},
	setDailyDoubleWager: amount => {
		set({ dailyDoubleWager: amount }, ...boardActionName('setDailyDoubleWager'))
	},
	setLastRoundWinner: playerName => {
		set({ lastRoundWinner: playerName }, ...boardActionName('setLastRoundWinner'))
	},
	setBoardScale: scale => {
		console.log({ scale })
		set({ boardScale: scale }, ...boardActionName('setBoardScale'))
	}
}), { name: 'Board' }))