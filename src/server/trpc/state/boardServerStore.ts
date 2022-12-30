import { ArrayToObject } from 'utils/ArrayToObject'
import { subscribeWithSelector } from 'zustand/middleware'
import create from 'zustand/vanilla'

import { eventEmitter } from '../router/_app'

export interface BoardState {
	questions: Record<string, Square[]>;
	activeQuestion: Question | null;

	importQuestions: (questions: Record<string, ImportQuestion[]>) => void;
	selectQuestion: (category: string, index: number) => void;
	endQuestion: () => void;
}

export interface QuestionSafe {
	question: string;
	image: string | null;
}

export interface ImportQuestion extends QuestionSafe {
	answer: string;
}

export interface Question extends ImportQuestion {
	amount: number;
}

export interface Square extends Question {
	active: boolean;
}

export const boardStore = create<BoardState>()(subscribeWithSelector((set, get) => ({
	questions: {},
	activeQuestion: null,

	importQuestions: questions => {
		set({
			questions: ArrayToObject(Object.entries(questions).map<[string, Square[]]>(([category, plainQuestions]) => [
				category,
				plainQuestions.map((plainQuestion, i) => ({ ...plainQuestion, active: true, amount: (i + 1) * 200 }))
			]))
		})
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