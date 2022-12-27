import create from 'zustand/vanilla'

import { eventEmitter } from '../router/_app'

export interface RoomStore {
	players: Record<string, number>;
	host: boolean;

	addPlayer: (name: string) => void;
	setHost: (hasHost: boolean) => void;
}

export const roomStore = create<RoomStore>()(set => ({
	players: {},
	host: false,

	addPlayer: name => {
		set(state => ({ players: { ...state.players, [name]: 0 } }))
	},
	setHost: hasHost => {
		set({ host: hasHost })
	}
}))

roomStore.subscribe(({ players, host }) => {
	console.log({ players, host })
	eventEmitter.emit('updatePlayers')
})