import { arrayToObject } from 'utils/arrayToObject'
import { randomArrayElement, weightedRandomData } from 'utils/random'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { eventEmitter } from '../router/_app'

export interface BoardState {
	questions: Record<string, Square[]>;
	activeQuestion: ActiveQuestion | null;
	dailyDouble: DailyDouble | null;
	dailyDoubleWager: number;
	boardScale: number;

	importQuestions: (questions: Record<string, ImportQuestion[]>) => void;
	selectQuestion: (category: string, index: number) => void;
	endQuestion: () => void;
	setDailyDoubleWager: (amount: number) => void;
	setBoardScale: (scale: number) => void;
}

type DailyDouble = [category: string, questionIndex: number]

export interface QuestionBase {
	question: string;
	image: string | null;
}

export interface ImportQuestion extends QuestionBase {
	answer: string;
}

export interface ActiveQuestion extends ImportQuestion {
	amount: number;
	dailyDouble: boolean;
}

export interface Square extends ActiveQuestion {
	active: boolean;
}

export interface CompleteQuestionSafe {
	question: string | null;
	image: string | null;
	dailyDouble: boolean | null;
}

export const boardStore = create<BoardState>()(subscribeWithSelector((set, get) => ({
	questions: {},
	activeQuestion: null,
	dailyDouble: null,
	dailyDoubleWager: 0,
	boardScale: 200,

	importQuestions: questions => {

		const randomCategory = randomArrayElement(Object.keys(questions))
		const randomQuestionTier = weightedRandomData([
			{ data: 0, weight: 0 },
			{ data: 1, weight: 15 },
			{ data: 2, weight: 45 },
			{ data: 3, weight: 65 },
			{ data: 4, weight: 45 }
		])
		if (!randomCategory || !randomQuestionTier) return

		set(state => ({
			questions: arrayToObject(Object.entries(questions).map<[string, Square[]]>(([category, plainQuestions]) => [
				category,
				plainQuestions.map((plainQuestion, i) => ({
					...plainQuestion,
					active: true,
					amount: (i + 1) * state.boardScale,
					dailyDouble: category === randomCategory && i === randomQuestionTier
				}))
			])),
			dailyDouble: [randomCategory, randomQuestionTier]
		}))
	},
	selectQuestion: (category, index) => {

		const categorySquares = get().questions[category]
		categorySquares[index].active = false

		set(state => ({
			questions: {
				...state.questions,
				[category]: categorySquares
			},
			activeQuestion: state.questions[category][index]
		}))
	},
	endQuestion: () => {
		set({ activeQuestion: null })
	},
	setDailyDoubleWager: amount => {
		set({ dailyDoubleWager: amount })
	},
	setBoardScale: scale => {
		set(state => ({
			boardScale: scale,
			questions: arrayToObject(Object.entries(state.questions).map<[string, Square[]]>(([category, plainQuestions]) => [
				category,
				plainQuestions.map((plainQuestion, i) => ({
					...plainQuestion,
					amount: (i + 1) * scale
				}))
			]))
		}))
	}
})))

boardStore.subscribe(state => state.questions, questions => {
	console.log({ questions })
	eventEmitter.emit('updateBoard')
})

boardStore.subscribe(state => state.activeQuestion, activeQuestions => {
	console.log({ activeQuestions })
	eventEmitter.emit('selectQuestion')
})

boardStore.subscribe(state => state.dailyDouble, dailyDouble => {
	console.log({ dailyDouble })
})

boardStore.subscribe(state => state.dailyDoubleWager, dailyDoubleWager => {
	console.log({ dailyDoubleWager })
	eventEmitter.emit('updateWager')
})

boardStore.subscribe(state => state.boardScale, boardScale => {
	console.log({ boardScale })
	eventEmitter.emit('updateBoardScale')
})