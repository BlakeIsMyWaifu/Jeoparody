import { useMantineTheme, Paper, Stack, Box, Divider } from '@mantine/core'
import { type ReactNode, type FC, useMemo } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import PointsDisplay from './PointsDisplay'
import PlayerNameDisplay from './PlayerNameDisplay'

interface BuzzerProps {
	playerName: string;
	children?: ReactNode;
}

const Buzzer: FC<BuzzerProps> = ({ playerName, children }) => {

	const theme = useMantineTheme()

	const [firstBuzzed, ...otherBuzzes] = usePlayerStore(state => state.buzzes)
	const border = useMemo(() => {
		const neutral = theme.colors.dark[7]
		const firstColour = theme.colors.green[9]
		const otherColour = theme.colors.orange[9]
		return firstBuzzed === playerName ? firstColour : (otherBuzzes.includes(playerName) ? otherColour : neutral)
	}, [firstBuzzed, otherBuzzes, playerName, theme.colors])

	return (
		<Paper p='xs' style={{
			height: '200px',
			flex: '1',
			border: `${border} 2px solid`,
			minWidth: '180px'
		}}>
			<Stack>
				<Box>
					<Divider label='Player' labelPosition='center' />
					<PlayerNameDisplay playerName={playerName} />
				</Box>
				<Box>
					<Divider label='Points' labelPosition='center' />
					<PointsDisplay playerName={playerName} />
				</Box>
				{children}
			</Stack>
		</Paper>
	)
}

export default Buzzer