import { useMantineTheme, Paper, Stack, Box, Divider, Group, Text } from '@mantine/core'
import { type ReactNode, type FC, useMemo } from 'react'
import { useHostStore } from 'state/hostClientStore'
import { usePlayerStore } from 'state/playerClientStore'
import KickButton from './KickButton'

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

	const playerPoints = usePlayerStore(state => state.players[playerName])

	const isHost = useHostStore(state => state.isHost)

	return (
		<Paper p='xs' style={{
			height: '100%',
			flex: '1 1 0',
			border: `${border} 2px solid`
		}}>
			<Stack>
				<Box>
					<Divider label='Player' labelPosition='center' />
					<Group
						position='center'
						align='end'
						style={{
							paddingLeft: isHost ? '36px' : 0
						}}
					>
						<Text align='center'>{playerName}</Text>
						<KickButton playerName={playerName} />
					</Group>
				</Box>
				<Box>
					<Divider label='Points' labelPosition='center' />
					<Text align='center'>£{playerPoints}</Text>
				</Box>
				{children}
			</Stack>
		</Paper>
	)
}

export default Buzzer