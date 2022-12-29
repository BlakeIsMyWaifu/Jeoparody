import { Box, useMantineTheme } from '@mantine/core'
import { useAllData } from 'hooks/useAllData'
import { type FC, type ReactNode } from 'react'

interface LayoutProps {
	mode: 'player' | 'host';
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ mode, children }) => {

	const theme = useMantineTheme()

	useAllData()

	return (
		<Box style={{
			position: 'absolute',
			height: '100vh',
			width: '100vw',
			top: '0',
			left: '0',
			display: 'grid',
			gridTemplateRows: '1fr 200px',
			gridTemplateColumns: '180px 1fr 180px',
			gridTemplateAreas: `"board board board" "${mode === 'player' ? 'buzzer' : 'hostControls'} buzzers buzzOrder"`,
			gap: '16px',
			padding: '16px',
			backgroundColor: theme.colors.dark[8]
		}}>
			{children}
		</Box>
	)
}

export default Layout