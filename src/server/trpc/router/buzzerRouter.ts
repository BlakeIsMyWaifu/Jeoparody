import { observable } from '@trpc/server/observable'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'
import { eventEmitter } from './_app'

export const buzzerRouter = router({
	buzz: publicProcedure
		.input(z.string())
		.mutation(({ ctx, input }) => {
			ctx.buzzerStore.getState().buzz(input)
		}),
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
	getBuzzes: publicProcedure
		.query(({ ctx }) => {
			return ctx.buzzerStore.getState().buzzes
		}),

	activateBuzzers: publicProcedure
		.mutation(({ ctx }) => {
			ctx.buzzerStore.getState().activateBuzzers()
		}),
	onUpdateActiveBuzzers: publicProcedure
		.subscription(({ ctx }) => {
			return observable<boolean>(emit => {
				const onUpdateActiveBuzzers = (): void => {
					const { active } = ctx.buzzerStore.getState()
					emit.next(active)
				}
				eventEmitter.on('updateActiveBuzzers', onUpdateActiveBuzzers)
				return () => {
					eventEmitter.off('updateActiveBuzzers', onUpdateActiveBuzzers)
				}
			})
		}),
	getActiveBuzzers: publicProcedure
		.query(({ ctx }) => {
			return ctx.buzzerStore.getState().active
		})
})