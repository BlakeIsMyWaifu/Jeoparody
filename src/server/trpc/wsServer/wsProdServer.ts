import http from 'http'
import { parse } from 'url'

import { applyWSSHandler } from '@trpc/server/adapters/ws'
import next from 'next'
import ws from 'ws'

import { createContext } from '../context'
import { appRouter } from '../router/_app'

const port = parseInt(process.env.PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = http.createServer((req, res) => {
		const proto = req.headers['x-forwarded-proto']
		if (proto && proto === 'http') {
			res.writeHead(303, {
				location: 'https://' + req.headers.host + (req.headers.url ?? '')
			})
			res.end()
			return
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const parsedUrl = parse(req.url!, true)
		handle(req, res, parsedUrl)
	})

	const wss = new ws.Server({ server })

	const handler = applyWSSHandler({ wss, router: appRouter, createContext })

	process.on('SIGTERM', () => {
		console.log('SIGTERM')
		handler.broadcastReconnectNotification()
	})

	server.listen(port)

	console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
})