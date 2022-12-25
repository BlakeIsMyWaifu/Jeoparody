import { Group, Container, Stack, Button, Text } from '@mantine/core'
import { useBuzzerData } from 'hooks/useBuzzerData'
import { usePlayerData } from 'hooks/usePlayerData'
import { type FC, type ReactNode } from 'react'
import { usePlayerStore } from 'state/playerStore'
import { trpc } from 'utils/trpc'

const Buzzers: FC = () => {

	const players = usePlayerData()

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

	const [firstBuzzed, ...otherBuzzes] = useBuzzerData()

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

	return (
		<Buzzer playerName={playerName} points={points}>
			<Button onClick={() => {
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