import { Divider, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import { type FC } from 'react'
import { usePlayerStore } from 'state/playerClientStore'

const BuzzOrder: FC = () => {

	const buzzes = usePlayerStore(state => state.buzzes)

	return (
		<Paper
			p='xs'
			component={ScrollArea}
			type='auto'
			style={{
				minWidth: '180px',
				height: '200px'
			}}
		>
			<Stack>
				<Divider label='Buzz Order' labelPosition='center' />
				{
					buzzes.map(playerName => {
						return <Text key={playerName}>{playerName}</Text>
					})
				}
			</Stack>
		</Paper>
	)
}

export default BuzzOrder