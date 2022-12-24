import { router } from '../trpc'
import { roomRouter } from './roomRouter'

export const appRouter = router({
	room: roomRouter
})

export type AppRouter = typeof appRouter;
