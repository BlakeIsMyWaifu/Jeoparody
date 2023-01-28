import { ActionIcon } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { type FC } from 'react'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

interface AnswerButtonProps {
	playerName: string;
	correct: boolean;
}

const AnswerButton: FC<AnswerButtonProps> = ({ playerName, correct }) => {

	const hasBuzzed = usePlayerStore(state => state.buzzes).includes(playerName)

	const playerCorrect = trpc.points.playerCorrect.useMutation()
	const playerWrong = trpc.points.playerWrong.useMutation()

	const endQuestion = trpc.question.endQuestion.useMutation()

	return (
		<ActionIcon
			variant='light'
			disabled={!hasBuzzed}
			color={correct ? 'green' : 'red'}
			onClick={async () => {
				if (correct) {
					await playerCorrect.mutateAsync(playerName)
					await endQuestion.mutateAsync()
				} else {
					await playerWrong.mutateAsync(playerName)
				}
			}}
		>
			{correct ? <IconCheck /> : <IconX />}
		</ActionIcon>
	)
}

export default AnswerButton