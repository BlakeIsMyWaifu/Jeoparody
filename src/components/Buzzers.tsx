import { Group, Container, Stack, Button, Text } from '@mantine/core'
import { type FC, type ReactNode } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

const Buzzers: FC = () => {

	const players = usePlayerStore(state => state.players)

	const ownPlayerName = usePlayerStore(state => state.playerName)

	return (
		<Group position='center' style={{
			gridArea: 'buzzers'
		}}>
			{
				Object.entries(players).map(([name, points]) => {
					return ownPlayerName === name
						? <PlayerSelfBuzzer
							key={name}
							playerName={name}
							points={points}
						/>
						: <PlayerOtherBuzzer
							key={name}
							playerName={name}
							points={points}
						/>
				})
			}
		</Group>
	)
}

interface BuzzerProps {
	playerName: string;
	points: number;
	children: ReactNode;
}

const Buzzer: FC<BuzzerProps> = ({ playerName, points, children }) => {

	const [firstBuzzed, ...otherBuzzes] = usePlayerStore(state => state.buzzes)

	return (
		<Container style={{
			border: 'white 2px solid',
			height: '100%',
			backgroundColor: firstBuzzed === playerName ? 'green' : (otherBuzzes.includes(playerName) ? 'yellow' : undefined)
		}}>
			<Stack justify='space-between'>
				<Text>{playerName}</Text>
				<Text>${points}</Text>
				{children}
			</Stack>
		</Container>
	)
}

interface PlayerBuzzerProps {
	playerName: string;
	points: number;
}

const PlayerSelfBuzzer: FC<PlayerBuzzerProps> = ({ playerName, points }) => {

	const buzzer = trpc.buzzer.buzz.useMutation()

	const active = usePlayerStore(state => state.activeBuzzers)

	return (
		<Buzzer playerName={playerName} points={points}>
			<Button disabled={!active} onClick={() => {
				buzzer.mutate(playerName)
			}}>Buzz</Button>
		</Buzzer>
	)
}

const PlayerOtherBuzzer: FC<PlayerBuzzerProps> = ({ playerName, points }) => {
	return (
		<Buzzer playerName={playerName} points={points}>
			{ }
		</Buzzer>
	)
}

export default Buzzers