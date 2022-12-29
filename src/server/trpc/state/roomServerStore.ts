import create from 'zustand/vanilla'

import { eventEmitter } from '../router/_app'

export interface RoomStore {
	players: Record<string, number>;
	host: boolean;

	addPlayer: (name: string) => void;
	setHost: (hasHost: boolean) => void;
	adjustPoints: (player: string, amount: number) => void;
}

export const roomStore = create<RoomStore>()(set => ({
	players: {},
	host: false,

	addPlayer: name => {
		set(state => ({ players: { ...state.players, [name]: 0 } }))
	},
	setHost: hasHost => {
		set({ host: hasHost })
	},
	adjustPoints: (player, amount) => {
		set(state => ({
			players: {
				...state.players,
				[player]: state.players[player] + amount
			}
		}))
	}
}))

roomStore.subscribe(({ players, host }) => {
	console.log({ players, host })
	eventEmitter.emit('updatePlayers')
})