import { Box } from '@mantine/core'
import { type FC, type ReactNode } from 'react'

interface LayoutProps {
	mode: 'player' | 'host';
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ mode, children }) => {
	return (
		<Box style={{
			position: 'absolute',
			height: '100vh',
			width: '100vw',
			top: '0',
			left: '0',
			display: 'grid',
			gridTemplateRows: '1fr 320px',
			gridTemplateColumns: '200px 1fr 200px',
			gridTemplateAreas: `"board board board" "${mode === 'player' ? 'buzzer' : 'hostControls'} buzzers buzzOrder"`,
			gap: '16px',
			padding: '16px'
		}}>
			{children}
		</Box>
	)
}

export default Layout