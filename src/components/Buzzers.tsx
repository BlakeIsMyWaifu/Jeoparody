import { Group, Container, Stack, Button, Text, ActionIcon, Divider, Box, Center } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { type FC, type ReactNode } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

const Buzzers: FC = () => {

	const players = usePlayerStore(state => state.players)
	const ownPlayerName = usePlayerStore(state => state.playerName)
	const isPlayer = usePlayerStore(state => state.isPlayer)

	return (
		<Group position='center' style={{
			gridArea: 'buzzers',
			display: 'flex'
		}}>
			{
				isPlayer
					? Object.keys(players).map(playerName => {
						return ownPlayerName === playerName
							? <PlayerSelfBuzzer key={playerName} playerName={playerName} />
							: <Buzzer key={playerName} playerName={playerName} />
					})
					: Object.keys(players).map(playerName => {
						return <HostBuzzer key={playerName} playerName={playerName} />
					})
			}
		</Group>
	)
}

interface BuzzerProps {
	playerName: string;
	children?: ReactNode;
}

const Buzzer: FC<BuzzerProps> = ({ playerName, children }) => {

	const [firstBuzzed, ...otherBuzzes] = usePlayerStore(state => state.buzzes)

	const playerPoints = usePlayerStore(state => state.players[playerName])

	return (
		<Container style={{
			border: 'white 2px solid',
			width: '0',
			height: '100%',
			flex: '1 1 0',
			backgroundColor: firstBuzzed === playerName ? 'green' : (otherBuzzes.includes(playerName) ? 'yellow' : undefined)
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
		</Container>
	)
}

const PlayerSelfBuzzer: FC<BuzzerProps> = ({ playerName }) => {

	const buzzer = trpc.buzzer.buzz.useMutation()

	const active = usePlayerStore(state => state.activeBuzzers)

	return (
		<Buzzer playerName={playerName}>
			<Box>
				<Divider label='Buzzer' labelPosition='center' />
				<Center>
					<Button disabled={!active} onClick={() => {
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
	colour: string;
	icon: ReactNode;
}

const AnswerButton: FC<AnswerButtonProps> = ({ colour, icon }) => {

	const active = usePlayerStore(state => state.activeBuzzers)

	return (
		<ActionIcon
			variant='light'
			disabled={!active}
			color={colour}
		>
			{icon}
		</ActionIcon>
	)
}

const HostBuzzer: FC<BuzzerProps> = ({ playerName }) => {
	return (
		<Buzzer playerName={playerName}>
			<Box>
				<Divider label='Answer' labelPosition='center' />
				<Group position='center'>
					<AnswerButton colour='green' icon={<IconCheck />} />
					<AnswerButton colour='red' icon={<IconX />} />
				</Group>
			</Box>
		</Buzzer>
	)
}

export default Buzzers