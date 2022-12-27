import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { playerActionName } from './createActionName'

interface PlayerStore {
	isPlayer: boolean;
	playerName: string;
	players: Record<string, number>;
	buzzes: string[];

	setPlayer: (name: string) => void;
	setPlayers: (players: Record<string, number>) => void;
	setBuzzes: (buzzes: string[]) => void;
}

export const usePlayerStore = create<PlayerStore>()(devtools(set => ({
	isPlayer: false,
	playerName: '',
	buzzes: [],
	players: {},

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
	}
}), { name: 'Player' }))