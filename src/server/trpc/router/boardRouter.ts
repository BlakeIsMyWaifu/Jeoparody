import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import type { Square } from '../state/boardStore'
import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

const questionsToBoard = (questions: Record<string, Square[]>): Record<string, boolean[]> => {
	return Object.entries(questions).map<[string, boolean[]]>(([categories, plainQuestions]) => [
		categories,
		plainQuestions.map(question => question.active)
	]).reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {})
}

export const boardRouter = router({
	importQuestions: publicProcedure
		.input(z.record(z.array(z.object({
			question: z.string(),
			answer: z.string(),
			image: z.string().optional()
		})).length(5)))
		.mutation(({ ctx, input }) => {
			ctx.boardStore.getState().importQuestions(input)
		}),
	onUpdateBoard: publicProcedure
		.subscription(({ ctx }) => {
			return observable<Record<string, boolean[]>>(emit => {
				const onUpdateBoard = (): void => {
					const board = questionsToBoard(ctx.boardStore.getState().questions)
					emit.next(board)
				}
				eventEmitter.on('updateBoard', onUpdateBoard)
				return () => {
					eventEmitter.off('updateBoard', onUpdateBoard)
				}
			})
		}),
	getBoard: publicProcedure
		.query(({ ctx }) => {
			return questionsToBoard(ctx.boardStore.getState().questions)
		})
})