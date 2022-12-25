import { useState } from 'react'
import { trpc } from 'utils/trpc'

export const useBuzzerData = (): string[] => {

	const [buzzes, setBuzzes] = useState<string[]>([])

	trpc.buzzer.onBuzz.useSubscription(undefined, { onData: setBuzzes })

	return buzzes
}