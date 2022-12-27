import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

export const usePlayerData = (): void => {

	const setPlayers = usePlayerStore(state => state.setPlayers)

	trpc.players.onUpdatePlayers.useSubscription(undefined, { onData: setPlayers })
	trpc.players.getPlayers.useQuery(undefined, { onSuccess: setPlayers })
}