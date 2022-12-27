import { EventEmitter } from 'node:events'

import { router } from '../trpc'
import { boardRouter } from './boardRouter'
import { buzzerRouter } from './buzzerRouter'
import { playersRouter } from './playersRouter'
import { questionRouter } from './questionRouter'
import { roomRouter } from './roomRouter'

export const appRouter = router({
	room: roomRouter,
	players: playersRouter,
	buzzer: buzzerRouter,
	board: boardRouter,
	question: questionRouter
})

export type AppRouter = typeof appRouter;

export const eventEmitter = new EventEmitter()