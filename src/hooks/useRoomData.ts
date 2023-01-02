import type { UpdateRoom } from 'server/trpc/router/roomRouter'
import { useBoardStore } from 'state/boardClientStore'
import { useHostStore } from 'state/hostClientStore'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

export const useRoomData = (): void => {

	const setPlayers = usePlayerStore(state => state.setPlayers)
	const setHasHost = useHostStore(state => state.setHasHost)
	const setLastRoundWinner = useBoardStore(state => state.setLastRoundWinner)

	const handleUpdate = ({ players, host, lastRoundWinner }: UpdateRoom): void => {
		setPlayers(players)
		setHasHost(host)
		setLastRoundWinner(lastRoundWinner)
	}

	trpc.room.onUpdateRoom.useSubscription(undefined, { onData: handleUpdate })
	trpc.room.getRoom.useQuery(undefined, { onSuccess: handleUpdate })
}