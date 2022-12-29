import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { hostActionName } from './createActionName'

interface HostStore {
	isHost: boolean;
	hasHost: boolean;
	activeQuestionAnswer: string | null;

	becomeHost: () => void;
	setHasHost: (status: boolean) => void;
	setActiveQuestionAnswer: (answer: string | null) => void;
}

export const useHostStore = create<HostStore>()(devtools(set => ({
	isHost: false,
	hasHost: false,
	activeQuestionAnswer: null,

	becomeHost: () => {
		set({ isHost: true }, ...hostActionName('becomeHost'))
	},
	setHasHost: status => {
		set({ hasHost: status }, ...hostActionName('setHasHost'))
	},
	setActiveQuestionAnswer: answer => {
		set({ activeQuestionAnswer: answer }, ...hostActionName('setActiveQuestionAnswer'))
	}
}), { name: 'Host' }))