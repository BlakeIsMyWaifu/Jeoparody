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
		.mutation<void>(({ ctx, input }) => {
			ctx.boardStore.getState().importQuestions(input)
			ctx.roomStore.getState().setLastRoundWinner(null)
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
		.query<Record<string, boolean[]>>(({ ctx }) => {
			return questionsToBoard(ctx.boardStore.getState().questions)
		}),

	updateBoardScale: publicProcedure
		.input(z.number())
		.mutation<void>(({ ctx, input }) => {
			ctx.boardStore.getState().setBoardScale(input)
		}),
	onUpdateBoardScale: publicProcedure
		.subscription(({ ctx }) => {
			return observable<number>(emit => {
				const onUpdateBoardScale = (): void => {
					const { boardScale } = ctx.boardStore.getState()
					emit.next(boardScale)
				}
				eventEmitter.on('updateBoardScale', onUpdateBoardScale)
				return () => {
					eventEmitter.off('updateBoardScale', onUpdateBoardScale)
				}
			})
		}),
	getBoardScale: publicProcedure
		.query<number>(({ ctx }) => {
			return ctx.boardStore.getState().boardScale
		})
})