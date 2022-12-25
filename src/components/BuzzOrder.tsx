import { Box, Stack, Text } from '@mantine/core'
import { useBuzzerData } from 'hooks/useBuzzerData'
import { type FC } from 'react'

const BuzzOrder: FC = () => {

	const buzzes = useBuzzerData()

	return (
		<Box style={{
			gridArea: 'buzzOrder',
			border: 'white 2px solid'
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