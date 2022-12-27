import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { type QuestionSafe } from '../state/boardServerStore'
import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const questionRouter = router({
	selectQuestion: publicProcedure
		.input(z.object({
			category: z.string(),
			index: z.number()
		}))
		.mutation(({ ctx, input }) => {
			ctx.boardStore.getState().selectQuestion(input.category, input.index)
			const { activeQuestion } = ctx.boardStore.getState()
			return activeQuestion ? {
				question: activeQuestion.question,
				answer: activeQuestion.answer,
				image: activeQuestion.image
			} : null
		}),
	onSelectQuestion: publicProcedure
		.subscription(({ ctx }) => {
			return observable<QuestionSafe | null>(emit => {
				const onSelectQuestion = (): void => {
					const { activeQuestion } = ctx.boardStore.getState()
					emit.next(activeQuestion ? {
						question: activeQuestion.question,
						image: activeQuestion.image
					} : null)
				}
				eventEmitter.on('selectQuestion', onSelectQuestion)
				return () => {
					eventEmitter.off('selectQuestion', onSelectQuestion)
				}
			})
		}),
	getQuestion: publicProcedure
		.query(({ ctx }) => {
			const { activeQuestion } = ctx.boardStore.getState()
			return activeQuestion ? {
				question: activeQuestion.question,
				image: activeQuestion.image
			} : null
		}),
	endQuestion: publicProcedure
		.mutation(({ ctx }) => {
			ctx.boardStore.getState().endQuestion()
		})
})