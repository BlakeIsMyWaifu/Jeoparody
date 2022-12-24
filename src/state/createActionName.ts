const createActionName = (storeName: string) => (actionName: string): [false, string] => [false, `${storeName}/${actionName}`]

export const hostActionName = createActionName('host')

export const playerActionName = createActionName('player')