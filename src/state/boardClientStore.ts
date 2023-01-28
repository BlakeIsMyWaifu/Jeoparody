import { type CompleteQuestionSafe } from 'server/trpc/state/boardServerStore'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { boardActionName, type Slice } from 'utils/zustand'

type BoardStore = BoardStateSlice & BoardActionSlice

interface BoardStateSlice {
	board: Record<string, boolean[]>;
	question: CompleteQuestionSafe;
	lastRoundWinner: string | null;
	dailyDoubleWager: number;
	boardScale: number;
}

const boardStateSlice: BoardStateSlice = {
	board: {},
	question: {
		question: null,
		image: null,
		dailyDouble: null
	},
	lastRoundWinner: null,
	dailyDoubleWager: 0,
	boardScale: 200
}

interface BoardActionSlice {
	setBoard: (board: Record<string, boolean[]>) => void;
	setQuestion: (fullQuestion: CompleteQuestionSafe) => void;
	setDailyDoubleWager: (amount: number) => void;
	setLastRoundWinner: (playerName: string | null) => void;
	setBoardScale: (scale: number) => void;
	reset: () => void;
}

const boardActionSlice: Slice<BoardStore, BoardActionSlice> = set => ({
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
		set({ boardScale: scale }, ...boardActionName('setBoardScale'))
	},
	reset: () => {
		set({ ...boardStateSlice })
	}
})

export const useBoardStore = create<BoardStore>()(devtools((...a) => ({
	...boardStateSlice,
	...boardActionSlice(...a)
}), { name: 'Board' }))