import { MantineProvider } from '@mantine/core'
import { type AppProps, type AppType } from 'next/app'
import Head from 'next/head'

import { trpc } from 'utils/trpc'

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return <>
		<Head>
			<title>Jeoparody</title>
			<link rel='icon' href='/favicon.ico' />
			<meta charSet='UTF-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
		</Head>

		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: 'dark',
				globalStyles: theme => ({
					body: {
						backgroundColor: theme.colors.dark[8]
					}
				})
			}}
		>
			<Component {...pageProps} />
		</MantineProvider>
	</>
}

export default trpc.withTRPC(MyApp)
