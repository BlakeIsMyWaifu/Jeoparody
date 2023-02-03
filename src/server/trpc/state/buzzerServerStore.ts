import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { eventEmitter } from '../router/_app'

export interface BuzzerStore {
	buzzes: string[];
	active: boolean;

	buzz: (playerName: string) => void;
	activateBuzzers: () => void;
	resetBuzzers: () => void;
}

export const buzzerStore = create<BuzzerStore>()(subscribeWithSelector((set, get) => ({
	buzzes: [],
	active: false,

	buzz: playerName => {
		if (get().buzzes.includes(playerName) || !get().active) return
		set(state => ({ buzzes: [...state.buzzes, playerName] }))
	},
	activateBuzzers: () => {
		set({ active: true })
	},
	resetBuzzers: () => {
		set({
			buzzes: [],
			active: false
		})
	}
})))

buzzerStore.subscribe(state => state.buzzes, buzzes => {
	console.log({ buzzes })
	eventEmitter.emit('updateBuzzes')
})

buzzerStore.subscribe(state => state.active, active => {
	console.log({ active })
	eventEmitter.emit('updateActiveBuzzers')
})