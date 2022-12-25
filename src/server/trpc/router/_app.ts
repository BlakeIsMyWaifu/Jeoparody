import { EventEmitter } from 'node:events'

import { router } from '../trpc'
import { playersRouter } from './playersRouter'
import { roomRouter } from './roomRouter'

export const appRouter = router({
	room: roomRouter,
	players: playersRouter
})

export type AppRouter = typeof appRouter;

export const eventEmitter = new EventEmitter()