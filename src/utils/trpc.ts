import { createWSClient, httpBatchLink, loggerLink, type TRPCLink, wsLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { type AnyRouter, type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { type NextPageContext } from 'next'
import getConfig from 'next/config'
import superjson from 'superjson'

import { type AppRouter } from 'server/trpc/router/_app'

const { publicRuntimeConfig } = getConfig()

const { APP_URL, WS_URL } = publicRuntimeConfig

function getEndingLink(ctx: NextPageContext | undefined): TRPCLink<AnyRouter> {
	if (typeof window === 'undefined') {
		return httpBatchLink({
			url: `${APP_URL}/api/trpc`,
			headers() {
				if (ctx?.req) {
					return {
						...ctx.req.headers,
						'x-ssr': '1'
					}
				}
				return {}
			}
		})
	}
	const client = createWSClient({
		url: WS_URL
	})
	return wsLink<AppRouter>({
		client
	})
}

export const trpc = createTRPCNext<AppRouter>({
	config({ ctx }) {
		return {
			links: [
				loggerLink({
					enabled: opts => (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') || (opts.direction === 'down' && opts.result instanceof Error)
				}),
				getEndingLink(ctx)
			],
			transformer: superjson,
			queryClientConfig: {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false
					}
				}
			}
		}
	},
	ssr: true
})

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>
