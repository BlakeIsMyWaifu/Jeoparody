import { playerActionName, type Slice } from 'utils/zustand'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

type PlayerStore = PlayerStateSlice & PlayerActionSlice

interface PlayerStateSlice {
	isPlayer: boolean;
	playerName: string;
	players: Record<string, number>;
	buzzes: string[];
	activeBuzzers: boolean;
}

const playerStateSlice: PlayerStateSlice = {
	isPlayer: false,
	playerName: '',
	players: {},
	buzzes: [],
	activeBuzzers: false
}

interface PlayerActionSlice {
	setPlayer: (name: string) => void;
	setPlayers: (players: Record<string, number>) => void;
	setBuzzes: (buzzes: string[]) => void;
	setActiveBuzzers: (buzzerState: boolean) => void;
}

const playerActionSlice: Slice<PlayerStore, PlayerActionSlice> = set => ({
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
})

export const usePlayerStore = create<PlayerStore>()(devtools((...a) => ({
	...playerStateSlice,
	...playerActionSlice(...a)
}), { name: 'Player' }))