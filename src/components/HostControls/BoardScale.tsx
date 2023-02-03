import { ActionIcon, NumberInput } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconUpload } from '@tabler/icons-react'
import { type FC } from 'react'
import { trpc } from 'utils/trpc'

const BoardScale: FC = () => {

	const [scale, setScale] = useInputState(200)

	const updateBoardScale = trpc.board.updateBoardScale.useMutation()

	return (
		<NumberInput
			value={scale}
			onChange={setScale}
			min={100}
			step={50}
			label='Board Scale'
			placeholder='Default: 200'
			stepHoldDelay={500}
			stepHoldInterval={stepCount => Math.max(1000 / stepCount ** 2, 25)}
			rightSection={<ActionIcon mr='xs' onClick={() => {
				updateBoardScale.mutate(scale)
			}}><IconUpload opacity={0.6} /></ActionIcon>}
		/>
	)
}

export default BoardScale