import { Group, Container, Stack, Button, Text } from '@mantine/core'
import { useState, type FC, type ReactNode } from 'react'
import { usePlayerStore } from 'state/playerStore'
import { trpc } from 'utils/trpc'

const Buzzers: FC = () => {

	const [players, setPlayers] = useState<Record<string, number>>({})
	trpc.players.onUpdatePlayers.useSubscription(undefined, { onData: setPlayers })
	trpc.players.getPlayers.useQuery(undefined, { onSuccess: setPlayers })

	const playerName = usePlayerStore(state => state.playerName)

	return (
		<Group position='center' style={{
			gridArea: 'buzzers'
		}}>
			{
				Object.entries(players).map(([name, points]) => {
					return playerName === name
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
	return (
		<Container style={{
			border: 'white 2px solid',
			height: '100%'
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
	return (
		<Buzzer playerName={playerName} points={points}>
			<Button>Buzz</Button>
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