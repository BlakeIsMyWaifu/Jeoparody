// @ts-check
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const remoteCdnArray = process.env.CDN?.split(', ') ?? []

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	publicRuntimeConfig: {
		APP_URL: process.env.APP_URL,
		WS_URL: process.env.WS_URL
	},
	images: {
		remotePatterns: remoteCdnArray.map(cdn => ({
			protocol: 'https',
			hostname: cdn
		}))
	}
}

export default config
