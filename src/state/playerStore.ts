import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { playerActionName } from './createActionName'

interface PlayerStore {
	isPlayer: boolean;
	playerName: string;

	setPlayer: (name: string) => void;
}

export const usePlayerStore = create<PlayerStore>()(devtools(set => ({
	isPlayer: false,
	playerName: '',

	setPlayer: name => {
		set({
			isPlayer: true,
			playerName: name
		}, ...playerActionName('setPlayer'))
	}
}), { name: 'Host' }))