import { Divider, Paper, Stack, Text } from '@mantine/core'
import { type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'

const HostStatus: FC = () => {

	const hasHost = useHostStore(state => state.hasHost)

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