import { useBoardStore } from 'state/boardClientStore'
import { trpc } from 'utils/trpc'

export const useBoardData = (): void => {

	const setBoard = useBoardStore(state => state.setBoard)

	trpc.board.onUpdateBoard.useSubscription(undefined, { onData: setBoard })
	trpc.board.getBoard.useQuery(undefined, { onSuccess: setBoard })

	const setBoardScale = useBoardStore(state => state.setBoardScale)

	trpc.board.onUpdateBoardScale.useSubscription(undefined, { onData: setBoardScale })
	trpc.board.getBoardScale.useQuery(undefined, { onSuccess: setBoardScale })
}