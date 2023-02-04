import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { Server } from 'ws'

import { createContext } from '../context'
import { appRouter } from '../router/_app'

const port = parseInt(process.env.PORT || '3001', 10)

const wss = new Server({ port })

const handler = applyWSSHandler({ wss, router: appRouter, createContext })

wss.on('connection', ws => {
	console.log(`➕➕ Connection (${wss.clients.size})`)
	ws.once('close', () => {
		console.log(`➖➖ Connection (${wss.clients.size})`)
	})
})

console.log(`✅ WebSocket Server listening on wss://localhost:${port}`)

process.on('SIGTERM', () => {
	console.log('SIGTERM')
	handler.broadcastReconnectNotification()
	wss.close()
})