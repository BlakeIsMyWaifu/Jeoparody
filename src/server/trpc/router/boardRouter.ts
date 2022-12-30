import { observable } from '@trpc/server/observable'
import { arrayToObject } from 'utils/arrayToObject'
import { z } from 'zod'

import { type Square } from '../state/boardServerStore'
import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

const questionsToBoard = (questions: Record<string, Square[]>): Record<string, boolean[]> => {
	return arrayToObject(Object.entries(questions).map<[string, boolean[]]>(([categories, plainQuestions]) => [
		categories,
		plainQuestions.map(question => question.active)
	]))
}

export const boardRouter = router({
	importQuestions: publicProcedure
		.input(z.record(z.array(z.object({
			question: z.string(),
			answer: z.string(),
			image: z.union([z.string(), z.null()])
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