import { Button, Paper, Stack, Text } from '@mantine/core'
import { type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'
import { useBoardStore } from 'state/boardClientStore'
import { trpc } from 'utils/trpc'

const Question: FC = () => {

	const isHost = useHostStore(state => state.isHost)

	const question = useBoardStore(state => state.question)

	return (
		<Paper style={{
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%'
		}}>
			<Stack>
				<Text>{question}</Text>
				{isHost && <HostQuestion />}
			</Stack>
		</Paper>
	)
}

const HostQuestion: FC = () => {

	const answer = useHostStore(state => state.activeQuestionAnswer)

	const activateBuzzers = trpc.buzzer.activateBuzzers.useMutation()

	const endQuestion = trpc.question.endQuestion.useMutation()

	return (
		<>
			<Text>{answer}</Text>
			<Button onClick={() => {
				activateBuzzers.mutate()
			}}>
				Activate Buzzers
			</Button>
			<Button onClick={() => {
				endQuestion.mutate()
			}}>End Question</Button>
		</>
	)
}

export default Question