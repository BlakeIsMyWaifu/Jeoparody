import { hostActionName, type Slice } from 'utils/zustand'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

type HostStore = HostStateSlice & HostActionSlice

interface HostStateSlice {
	isHost: boolean;
	hasHost: boolean;
	activeQuestionAnswer: string | null;
}

const hostStateSlice: HostStateSlice = {
	isHost: false,
	hasHost: false,
	activeQuestionAnswer: null
}

interface HostActionSlice {
	becomeHost: () => void;
	setHasHost: (status: boolean) => void;
	setActiveQuestionAnswer: (answer: string | null) => void;
}

const hostActionSlice: Slice<HostStore, HostActionSlice> = set => ({
	becomeHost: () => {
		set({ isHost: true }, ...hostActionName('becomeHost'))
	},
	setHasHost: status => {
		set({ hasHost: status }, ...hostActionName('setHasHost'))
	},
	setActiveQuestionAnswer: answer => {
		set({ activeQuestionAnswer: answer }, ...hostActionName('setActiveQuestionAnswer'))
	}
})

export const useHostStore = create<HostStore>()(devtools((...a) => ({
	...hostStateSlice,
	...hostActionSlice(...a)
}), { name: 'Host' }))