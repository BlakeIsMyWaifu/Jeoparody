import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { playerActionName } from './createActionName'

interface PlayerStore {
	isPlayer: boolean;
	playerName: string;
	players: Record<string, number>;
	buzzes: string[];
	activeBuzzers: boolean;

	setPlayer: (name: string) => void;
	setPlayers: (players: Record<string, number>) => void;
	setBuzzes: (buzzes: string[]) => void;
	setActiveBuzzers: (buzzerState: boolean) => void;
}

export const usePlayerStore = create<PlayerStore>()(devtools(set => ({
	isPlayer: false,
	playerName: '',
	players: {},
	buzzes: [],
	activeBuzzers: false,

	setPlayer: name => {
		set({
			isPlayer: true,
			playerName: name
		}, ...playerActionName('setPlayer'))
	},
	setPlayers: players => {
		set({ players }, ...playerActionName('setPlayers'))
	},
	setBuzzes: buzzes => {
		set({ buzzes }, ...playerActionName('setBuzzes'))
	},
	setActiveBuzzers: buzzerState => {
		set({ activeBuzzers: buzzerState }, ...playerActionName('setActiveBuzzers'))
	}
}), { name: 'Player' }))