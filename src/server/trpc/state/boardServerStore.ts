import { subscribeWithSelector } from 'zustand/middleware'
import create from 'zustand/vanilla'

import { eventEmitter } from '../router/_app'

export interface BoardState {
	questions: Record<string, Square[]>;
	activeQuestion: Question | null;

	importQuestions: (questions: Record<string, Question[]>) => void;
	selectQuestion: (category: string, index: number) => void;
	endQuestion: () => void;
}

export interface QuestionSafe {
	question: string;
	image?: string;
}

export interface Question extends QuestionSafe {
	answer: string;
}

export interface Square extends Question {
	active: boolean;
}

export const boardStore = create<BoardState>()(subscribeWithSelector((set, get) => ({
	questions: {},
	activeQuestion: null,

	importQuestions: questions => {
		set({
			questions: Object.entries(questions).map<[string, Square[]]>(([category, plainQuestions]) => [
				category,
				plainQuestions.map(plainQuestion => ({ ...plainQuestion, active: true }))
			]).reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {})
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