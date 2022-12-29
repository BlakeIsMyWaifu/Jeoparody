import { Box, useMantineTheme } from '@mantine/core'
import { useAllData } from 'hooks/useAllData'
import { type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'
import Board from './Board/Board'
import Buzzers from './Buzzers'
import BuzzOrder from './BuzzOrder'
import HostControls from './HostControls/HostControls'
import HostStatus from './HostStatus'

const Layout: FC = () => {

	const theme = useMantineTheme()

	const isHost = useHostStore(state => state.isHost)

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
			gridTemplateAreas: '"board board board" "hostControls buzzers buzzOrder"',
			gap: '16px',
			padding: '16px',
			backgroundColor: theme.colors.dark[8]
		}}>
			<Board />
			<Buzzers />
			<BuzzOrder />
			{isHost ? <HostControls /> : <HostStatus />}
		</Box>
	)
}

export default Layout