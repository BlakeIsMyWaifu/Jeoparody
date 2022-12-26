import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/adapters/node-http'
import { type IncomingMessage } from 'http'
import type ws from 'ws'
import { boardStore } from './state/boardStore'
import { buzzerStore } from './state/buzzerStore'
import { roomStore } from './state/roomStore'

type CreateContextOptions = Record<string, never>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createContextInner = async (_opts: CreateContextOptions) => {
	return {
		roomStore,
		buzzerStore,
		boardStore
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createContext = async (_opts: CreateNextContextOptions | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
	return await createContextInner({})
}

export type Context = inferAsyncReturnType<typeof createContext>;
