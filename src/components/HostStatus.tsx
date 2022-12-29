import { Divider, Paper, Stack, Text } from '@mantine/core'
import { useState, type FC } from 'react'
import { trpc } from 'utils/trpc'

const HostStatus: FC = () => {

	const [hasHost, setHasHost] = useState(false)
	trpc.room.onHostJoined.useSubscription(undefined, { onData: setHasHost })
	trpc.room.getHasHost.useQuery(undefined, { onSuccess: setHasHost })

	return (
		<Paper p='xs' style={{
			gridArea: 'hostControls'
		}}>
			<Stack>
				<Divider label='Host Status' labelPosition='center' />
				<Text color={hasHost ? 'green.9' : 'red.9'} align='center'>{hasHost ? 'Active' : 'Missing'}</Text>
			</Stack>
		</Paper>
	)
}

export default HostStatus