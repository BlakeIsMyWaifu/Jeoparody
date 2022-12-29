import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const playersRouter = router({
	onUpdatePlayers: publicProcedure
		.subscription(({ ctx }) => {
			return observable<Record<string, number>>(emit => {
				const onUpdatePlayers = (): void => {
					const { players } = ctx.roomStore.getState()
					emit.next(players)
				}
				eventEmitter.on('updatePlayers', onUpdatePlayers)
				return () => {
					eventEmitter.off('updatePlayers', onUpdatePlayers)
				}
			})
		}),
	getPlayers: publicProcedure
		.query(({ ctx }) => {
			return ctx.roomStore.getState().players
		}),
	forceRefresh: publicProcedure
		.mutation(() => {
			eventEmitter.emit('updatePlayers')
		}),

	adjustPoints: publicProcedure
		.input(z.object({
			player: z.string(),
			amount: z.union([z.number(), z.boolean()])
		}))
		.mutation(({ ctx, input }) => {
			if (typeof input.amount === 'number') {
				ctx.roomStore.getState().adjustPoints(input.player, input.amount)
			} else {
				const amount = ctx.boardStore.getState().activeQuestion?.amount ?? 0
				ctx.roomStore.getState().adjustPoints(input.player, amount * (input.amount ? 1 : -1))
			}
		})
})