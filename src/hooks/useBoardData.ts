import { useState } from 'react'
import { trpc } from 'utils/trpc'

export const useBoardData = (): Record<string, boolean[]> => {

	const [board, setBoard] = useState<Record<string, boolean[]>>({})

	trpc.board.onUpdateBoard.useSubscription(undefined, { onData: setBoard })
	trpc.board.getBoard.useQuery(undefined, { onSuccess: setBoard })

	return board
}