import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { hostActionName } from './createActionName'

interface HostStore {
	isHost: boolean;
	activeQuestionAnswer: string | null;

	becomeHost: () => void;
	setActiveQuestionAnswer: (answer: string | null) => void;
}

export const useHostStore = create<HostStore>()(devtools(set => ({
	isHost: false,
	activeQuestionAnswer: null,

	becomeHost: () => {
		set({ isHost: true }, ...hostActionName('becomeHost'))
	},
	setActiveQuestionAnswer: answer => {
		set({ activeQuestionAnswer: answer }, ...hostActionName('setActiveQuestionAnswer'))
	}
}), { name: 'Host' }))