import create from 'zustand/vanilla'

import { eventEmitter } from '../router/_app'

export interface BuzzerStore {
	buzzes: string[];

	buzz: (playerName: string) => void;
	reset: () => void;
}

export const buzzerStore = create<BuzzerStore>()((set, get) => ({
	buzzes: [],

	buzz: playerName => {
		if (get().buzzes.includes(playerName)) return
		set(state => ({ buzzes: [...state.buzzes, playerName] }))
	},
	reset: () => {
		set({ buzzes: [] })
	}
}))

buzzerStore.subscribe(({ buzzes }) => {
	console.log({ buzzes })
	eventEmitter.emit('updateBuzzes')
})