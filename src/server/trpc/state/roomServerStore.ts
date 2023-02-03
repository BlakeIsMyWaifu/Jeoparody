import { arrayToObject } from 'utils/arrayToObject'
import { create } from 'zustand'

import { eventEmitter } from '../router/_app'

export interface RoomStore {
	players: Record<string, number>;
	host: boolean;
	lastRoundWinner: string | null;

	addPlayer: (playerName: string) => void;
	setHost: (hasHost: boolean) => void;
	adjustPoints: (playerName: string, amount: number) => void;
	setLastRoundWinner: (playerName: string | null) => void;
	kickPlayer: (playerName: string) => void;
}

export const roomStore = create<RoomStore>()(set => ({
	players: {},
	host: false,
	lastRoundWinner: null,

	addPlayer: playerName => {
		set(state => ({ players: { ...state.players, [playerName]: 0 } }))
	},
	setHost: hasHost => {
		set({ host: hasHost })
	},
	adjustPoints: (playerName, amount) => {
		set(state => ({
			players: {
				...state.players,
				[playerName]: state.players[playerName] + amount
			}
		}))
	},
	setLastRoundWinner: playerName => {
		set({ lastRoundWinner: playerName })
	},
	kickPlayer: playerName => {
		set(state => ({
			players: arrayToObject(Object.entries(state.players).filter(([player]) => player !== playerName))
		}))
	}
}))

roomStore.subscribe(({ players, host, lastRoundWinner }) => {
	console.log({ players, host, lastRoundWinner })
	eventEmitter.emit('updateRoom')
})