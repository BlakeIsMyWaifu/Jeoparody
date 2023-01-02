import { EventEmitter } from 'node:events'

import { router } from '../trpc'
import { boardRouter } from './boardRouter'
import { buzzerRouter } from './buzzerRouter'
import { pointsRouter } from './pointsRouter'
import { questionRouter } from './questionRouter'
import { roomRouter } from './roomRouter'

export const appRouter = router({
	room: roomRouter,
	buzzer: buzzerRouter,
	board: boardRouter,
	question: questionRouter,
	points: pointsRouter
})

export type AppRouter = typeof appRouter;

export const eventEmitter = new EventEmitter()