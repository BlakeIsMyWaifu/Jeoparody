import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export interface UpdateRoom {
	players: Record<string, number>;
	host: boolean;
	lastRoundWinner: string | null;
}

export const roomRouter = router({
	becomeHost: publicProcedure
		.mutation<boolean>(({ ctx }) => {
			if (ctx.roomStore.getState().host) return false
			ctx.roomStore.getState().setHost(true)
			return true
		}),
	becomePlayer: publicProcedure
		.input(z.string())
		.mutation<[status: boolean, message: string]>(({ ctx, input }) => {
			if (!input.length) return [false, 'Name is required']
			if (Object.keys(ctx.roomStore.getState().players).includes(input)) return [false, 'Name already taken']

			ctx.roomStore.getState().addPlayer(input)
			return [true, input]
		}),

	onUpdateRoom: publicProcedure
		.subscription(({ ctx }) => {
			return observable<UpdateRoom>(emit => {
				const onUpdatePlayers = (): void => {
					const { players, host, lastRoundWinner } = ctx.roomStore.getState()
					emit.next({ players, host, lastRoundWinner })
				}
				eventEmitter.on('updateRoom', onUpdatePlayers)
				return () => {
					eventEmitter.off('updateRoom', onUpdatePlayers)
				}
			})
		}),
	getRoom: publicProcedure
		.query<UpdateRoom>(({ ctx }) => {
			const { players, host, lastRoundWinner } = ctx.roomStore.getState()
			return ({
				players,
				host,
				lastRoundWinner
			})
		})
})
