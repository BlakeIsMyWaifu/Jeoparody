import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

export const roomRouter = router({
	becomeHost: publicProcedure
		.mutation(({ ctx }) => {
			if (ctx.roomStore.getState().host) return false
			ctx.roomStore.getState().setHost(true)
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
		})
})
