import create from 'zustand/vanilla'

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