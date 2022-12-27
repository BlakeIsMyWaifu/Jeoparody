import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

export const useBuzzerData = (): void => {

	const setBuzzes = usePlayerStore(state => state.setBuzzes)

	trpc.buzzer.onBuzz.useSubscription(undefined, { onData: setBuzzes })
	trpc.buzzer.getBuzzes.useQuery(undefined, { onSuccess: setBuzzes })
}