import { Box, Stack, Text } from '@mantine/core'
import { type FC } from 'react'
import { usePlayerStore } from 'state/playerClientStore'

const BuzzOrder: FC = () => {

	const buzzes = usePlayerStore(state => state.buzzes)

	return (
		<Box style={{
			gridArea: 'buzzOrder'
		}}>
			<Stack>
				{
					buzzes.map(playerName => {
						return <Text key={playerName}>{playerName}</Text>
					})
				}
			</Stack>
		</Box>
	)
}

export default BuzzOrder