import create from 'zustand/vanilla'

import { eventEmitter } from '../router/_app'

export interface BoardState {
	questions: Record<string, Square[]>;

	importQuestions: (questions: Record<string, Question[]>) => void;
}

interface Question {
	question: string;
	image?: string;
	answer: string;
}

export interface Square extends Question {
	active: boolean;
}

export const boardStore = create<BoardState>()(set => ({
	questions: {},

	importQuestions: questions => {
		set({
			questions: Object.entries(questions).map<[string, Square[]]>(([category, plainQuestions]) => [
				category,
				plainQuestions.map(plainQuestion => ({ ...plainQuestion, active: true }))
			]).reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {})
		})
	}
}))

boardStore.subscribe(({ questions }) => {
	console.log({ questions })
	eventEmitter.emit('updateBoard')
})