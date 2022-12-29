import { useHostStore } from 'state/hostClientStore'
import { trpc } from 'utils/trpc'

export const useHostStatusData = (): void => {

	const setHasHost = useHostStore(state => state.setHasHost)

	trpc.room.onHostJoined.useSubscription(undefined, { onData: setHasHost })
	trpc.room.getHasHost.useQuery(undefined, { onSuccess: setHasHost })
}