import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const pointsRouter = router({
	adjustPoints: publicProcedure
		.input(z.object({
			player: z.string(),
			amount: z.number()
		}))
		.mutation<void>(({ ctx, input }) => {
			ctx.roomStore.getState().adjustPoints(input.player, input.amount)
		}),
	playerCorrect: publicProcedure
		.input(z.string())
		.mutation<void>(({ ctx, input }) => {
			const amount = ctx.boardStore.getState().activeQuestion?.amount ?? 0
			ctx.roomStore.getState().adjustPoints(input, amount)
			ctx.roomStore.getState().setLastRoundWinner(input)
		}),
	playerWrong: publicProcedure
		.input(z.string())
		.mutation<void>(({ ctx, input }) => {
			const amount = ctx.boardStore.getState().activeQuestion?.amount ?? 0
			ctx.roomStore.getState().adjustPoints(input, amount * -1)
		}),

	submitWager: publicProcedure
		.input(z.number())
		.mutation<void>(({ ctx, input }) => {
			ctx.boardStore.getState().setDailyDoubleWager(input)
		}),
	onUpdateWager: publicProcedure
		.subscription(({ ctx }) => {
			return observable<number>(emit => {
				const onUpdateWager = (): void => {
					const { dailyDoubleWager } = ctx.boardStore.getState()
					emit.next(dailyDoubleWager)
				}
				eventEmitter.on('updateWager', onUpdateWager)
				return () => {
					eventEmitter.off('updateWager', onUpdateWager)
				}
			})
		}),
	getWager: publicProcedure
		.query<number>(({ ctx }) => {
			return ctx.boardStore.getState().dailyDoubleWager
		})
})