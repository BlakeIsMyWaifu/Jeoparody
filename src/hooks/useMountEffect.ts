import { type EffectCallback, useEffect } from 'react'

export const useMountEffect = (func: EffectCallback): void => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, [])
}