import { Paper, Center, Title } from '@mantine/core'
import { type FC } from 'react'

const EmptyPlayerSection: FC = () => {
	return <Paper style={{
		width: '100%',
		height: '100%'
	}}>
		<Center style={{
			height: '100%'
		}}>
			<Title order={2} align='center'>Waiting for players to join . . .</Title>
		</Center>
	</Paper>
}

export default EmptyPlayerSection