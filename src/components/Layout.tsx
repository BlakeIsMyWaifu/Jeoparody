import { Box } from '@mantine/core'
import { type FC, type ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<Box style={{
			position: 'absolute',
			height: '100%',
			width: '100%',
			top: '0',
			left: '0',
			display: 'grid',
			gridTemplateRows: '1fr 320px',
			gridTemplateColumns: '1fr 200px',
			gridTemplateAreas: '"board board" "buzzers buzzOrder"'
		}}>
			{children}
		</Box>
	)
}

export default Layout