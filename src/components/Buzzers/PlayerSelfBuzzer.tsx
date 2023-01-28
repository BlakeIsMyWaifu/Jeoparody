import { Box, Button, Center, Divider } from '@mantine/core'
import { type FC, type ReactNode } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

import Buzzer from './Buzzer'

interface PlayerSelfBuzzerProps {
	playerName: string;
	children?: ReactNode;
}

const PlayerSelfBuzzer: FC<PlayerSelfBuzzerProps> = ({ playerName }) => {

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

export default PlayerSelfBuzzer