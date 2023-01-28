import { type StateCreator } from 'zustand'

const createActionName = (storeName: string) => (actionName: string): [false, string] => [false, `${storeName}/${actionName}`]

export const hostActionName = createActionName('host')
export const playerActionName = createActionName('player')
export const boardActionName = createActionName('board')

type ZustandDevtools = ['zustand/devtools', unknown]

export type Slice<T extends object, K extends object> = StateCreator<T, [ZustandDevtools], [], K>