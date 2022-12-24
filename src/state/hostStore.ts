import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { hostActionName } from './createActionName'

interface HostStore {
	isHost: boolean;

	becomeHost: () => void;
}

export const useHostStore = create<HostStore>()(devtools(set => ({
	isHost: false,

	becomeHost: () => {
		set({ isHost: true }, ...hostActionName('setIsHost'))
	}
}), { name: 'Host' }))