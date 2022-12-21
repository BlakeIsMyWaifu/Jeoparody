// @ts-check
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

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
	}
}

export default config
