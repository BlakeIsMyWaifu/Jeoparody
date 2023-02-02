import { Group } from '@mantine/core'
import { useCompactMode } from 'hooks/useCompactMode'
import { useMemo, type FC } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import Buzzer from './Buzzer'
import EmptyPlayerSection from './EmptyPlayerSection'
import HostBuzzer from './HostBuzzer'
import PlayerSelfBuzzer from './PlayerSelfBuzzer'

const Buzzers: FC = () => {

	const players = usePlayerStore(state => state.players)
	const playerNames = useMemo(() => Object.keys(players), [players])

	const ownPlayerName = usePlayerStore(state => state.playerName)
	const isPlayer = usePlayerStore(state => state.isPlayer)

	const compactMode = useCompactMode()

	return (
		<Group position='center' style={{
			width: '100%',
			order: compactMode ? -1 : undefined
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

export default Buzzers