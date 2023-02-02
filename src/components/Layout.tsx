import { Group, Stack } from '@mantine/core'
import { useCompactMode } from 'hooks/useCompactMode'
import { type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'
import Board from './Board'
import Buzzers from './Buzzers'
import BuzzOrder from './BuzzOrder'
import HostControls from './HostControls'
import HostStatus from './HostStatus'

const Layout: FC = () => {

	const isHost = useHostStore(state => state.isHost)

	const compactMode = useCompactMode()

	return (
		<Stack
			p='md'
			style={{
				minHeight: '100vh'
			}}>
			<Board />
			<Group
				align='stretch'
				position='center'
				style={{
					height: '200px',
					flexWrap: compactMode ? 'wrap' : 'nowrap'
				}}>
				{isHost ? <HostControls /> : <HostStatus />}
				<Buzzers />
				<BuzzOrder />
			</Group>
		</Stack>
	)
}

export default Layout