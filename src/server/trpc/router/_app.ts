import { EventEmitter } from 'node:events'

import { router } from '../trpc'
import { buzzerRouter } from './buzzerRouter'
import { playersRouter } from './playersRouter'
import { roomRouter } from './roomRouter'

export const appRouter = router({
	room: roomRouter,
	players: playersRouter,
	buzzer: buzzerRouter
})

export type AppRouter = typeof appRouter;

export const eventEmitter = new EventEmitter()