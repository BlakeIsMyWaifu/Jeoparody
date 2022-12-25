import { useState } from 'react'
import { trpc } from 'utils/trpc'

export const usePlayerData = (): Record<string, number> => {

	const [players, setPlayers] = useState<Record<string, number>>({})

	trpc.players.onUpdatePlayers.useSubscription(undefined, { onData: setPlayers })
	trpc.players.getPlayers.useQuery(undefined, { onSuccess: setPlayers })

	return players
}