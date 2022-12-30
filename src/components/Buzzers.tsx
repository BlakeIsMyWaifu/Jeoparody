import { Group, Stack, Button, Text, ActionIcon, Divider, Box, Center, Paper, useMantineTheme, Title } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useMemo, type FC, type ReactNode } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

const Buzzers: FC = () => {

	const players = usePlayerStore(state => state.players)
	const playerNames = useMemo(() => Object.keys(players), [players])

	const ownPlayerName = usePlayerStore(state => state.playerName)
	const isPlayer = usePlayerStore(state => state.isPlayer)

	return (
		<Group position='center' style={{
			gridArea: 'buzzers',
			display: 'flex'
		}}>
			{
				playerNames.length
					? isPlayer
						? playerNames.map(playerName => {
							return ownPlayerName === playerName
								? <PlayerSelfBuzzer key={playerName} playerName={playerName} />
								: <Buzzer key={playerName} playerName={playerName} />
						})
						: playerNames.map(playerName => {
							return <HostBuzzer key={playerName} playerName={playerName} />
						})
					: <EmptyPlayerSection />
			}
		</Group>
	)
}

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

	return (
		<Paper p='xs' style={{
			height: '100%',
			flex: '1 1 0',
			border: `${border} 2px solid`
		}}>
			<Stack>
				<Box>
					<Divider label='Player' labelPosition='center' />
					<Text align='center'>{playerName}</Text>
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

const PlayerSelfBuzzer: FC<BuzzerProps> = ({ playerName }) => {

	const buzzer = trpc.buzzer.buzz.useMutation()

	const active = usePlayerStore(state => state.activeBuzzers)
	const hasBuzzed = usePlayerStore(state => state.buzzes).includes(playerName)

	return (
		<Buzzer playerName={playerName}>
			<Box>
				<Divider label='Buzzer' labelPosition='center' />
				<Center>
					<Button
						compact
						color='green.9'
						disabled={!active || hasBuzzed}
						onClick={() => {
							buzzer.mutate(playerName)
						}}>
						Buzz
					</Button>
				</Center>
			</Box>
		</Buzzer>
	)
}

interface AnswerButtonProps {
	playerName: string;
	correct: boolean;
}

const AnswerButton: FC<AnswerButtonProps> = ({ playerName, correct }) => {

	const hasBuzzed = usePlayerStore(state => state.buzzes).includes(playerName)

	const adjustPoints = trpc.players.adjustPoints.useMutation()

	const endQuestion = trpc.question.endQuestion.useMutation()

	return (
		<ActionIcon
			variant='light'
			disabled={!hasBuzzed}
			color={correct ? 'green' : 'red'}
			onClick={async () => {
				await adjustPoints.mutateAsync({
					player: playerName,
					amount: correct
				})
				if (correct) await endQuestion.mutateAsync()
			}}
		>
			{correct ? <IconCheck /> : <IconX />}
		</ActionIcon>
	)
}

const HostBuzzer: FC<BuzzerProps> = ({ playerName }) => {
	return (
		<Buzzer playerName={playerName}>
			<Box>
				<Divider label='Answer' labelPosition='center' />
				<Group position='center'>
					<AnswerButton playerName={playerName} correct={true} />
					<AnswerButton playerName={playerName} correct={false} />
				</Group>
			</Box>
		</Buzzer>
	)
}

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

export default Buzzers