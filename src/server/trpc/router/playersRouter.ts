import { observable } from '@trpc/server/observable'

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
		})
})