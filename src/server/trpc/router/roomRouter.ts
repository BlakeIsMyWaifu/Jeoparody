import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const roomRouter = router({
	becomeHost: publicProcedure
		.mutation(({ ctx }) => {
			if (ctx.roomStore.getState().host) return false
			ctx.roomStore.getState().setHost(true)
			eventEmitter.emit('hostJoined')
			return true
		}),
	becomePlayer: publicProcedure
		.input(z.string())
		.mutation<[boolean, string]>(({ ctx, input }) => {
			if (!ctx.roomStore.getState().host) return [false, 'No host found']
			if (!input.length) return [false, 'Name is required']
			if (Object.keys(ctx.roomStore.getState().players).includes(input)) return [false, 'Name already taken']

			ctx.roomStore.getState().addPlayer(input)
			return [true, input]
		}),

	getHasHost: publicProcedure
		.query(({ ctx }) => {
			return ctx.roomStore.getState().host
		}),
	onHostJoined: publicProcedure
		.subscription(({ ctx }) => {
			return observable<boolean>(emit => {
				const onHostJoined = (): void => {
					emit.next(ctx.roomStore.getState().host)
				}
				eventEmitter.on('hostJoined', onHostJoined)
				return () => {
					eventEmitter.off('hostJoined', onHostJoined)
				}
			})
		})
})
