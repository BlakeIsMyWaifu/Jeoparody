import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const buzzerRouter = router({
	onBuzz: publicProcedure
		.subscription(({ ctx }) => {
			return observable<string[]>(emit => {
				const onBuzz = (): void => {
					const { buzzes } = ctx.buzzerStore.getState()
					emit.next(buzzes)
				}
				eventEmitter.on('updateBuzzes', onBuzz)
				return () => {
					eventEmitter.off('updateBuzzes', onBuzz)
				}
			})
		}),
	buzz: publicProcedure
		.input(z.string())
		.mutation(({ ctx, input }) => {
			ctx.buzzerStore.getState().buzz(input)
		})
})