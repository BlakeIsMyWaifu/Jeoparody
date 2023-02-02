import { useMediaQuery } from '@mantine/hooks'
import { useMemo } from 'react'
import { usePlayerStore } from 'state/playerClientStore'

export const PLAYER_MIN_WIDTH = 180

export const useCompactMode = (): boolean => {

	const players = usePlayerStore(state => state.players)
	const playersAmount = useMemo(() => Object.keys(players).length, [players])

	return !useMediaQuery(`(min-width: ${(PLAYER_MIN_WIDTH + 16) * (playersAmount + 2) + 16}px)`)
}