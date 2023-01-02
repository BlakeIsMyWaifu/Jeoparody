import { observable } from '@trpc/server/observable'
import { z } from 'zod'
import { type CompleteQuestionSafe } from '../state/boardServerStore'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const questionRouter = router({
	/**
	 * @returns {(string | null)} The question answer or null
	 */
	selectQuestion: publicProcedure
		.input(z.object({
			category: z.string(),
			index: z.number()
		}))
		.mutation<string | null>(({ ctx, input }) => {
			ctx.boardStore.getState().selectQuestion(input.category, input.index)
			const { activeQuestion } = ctx.boardStore.getState()
			return activeQuestion?.answer ?? null
		}),
	onSelectQuestion: publicProcedure
		.subscription(({ ctx }) => {
			return observable<CompleteQuestionSafe>(emit => {
				const onSelectQuestion = (): void => {
					const { activeQuestion } = ctx.boardStore.getState()
					emit.next({
						question: activeQuestion?.question ?? null,
						image: activeQuestion?.image ?? null,
						dailyDouble: activeQuestion?.dailyDouble ?? null
					})
				}
				eventEmitter.on('selectQuestion', onSelectQuestion)
				return () => {
					eventEmitter.off('selectQuestion', onSelectQuestion)
				}
			})
		}),
	getQuestion: publicProcedure
		.query<CompleteQuestionSafe>(({ ctx }) => {
			const { activeQuestion } = ctx.boardStore.getState()
			return ({
				question: activeQuestion?.question ?? null,
				image: activeQuestion?.image ?? null,
				dailyDouble: activeQuestion?.dailyDouble ?? null
			})
		}),
	endQuestion: publicProcedure
		.mutation<void>(({ ctx }) => {
			ctx.boardStore.getState().endQuestion()
			ctx.buzzerStore.getState().resetBuzzers()
		})
})