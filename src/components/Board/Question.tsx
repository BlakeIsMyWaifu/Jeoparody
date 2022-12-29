import { Button, Center, Group, Paper, Stack, Text } from '@mantine/core'
import { type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'
import { useBoardStore } from 'state/boardClientStore'
import { trpc } from 'utils/trpc'
import { usePlayerStore } from 'state/playerClientStore'

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
			<Center style={{
				height: '100%'
			}}>
				<Stack>
					<Text size={48} align='center'>{question}</Text>
					{isHost && <HostQuestion />}
				</Stack>
			</Center>
		</Paper>
	)
}

const HostQuestion: FC = () => {

	const answer = useHostStore(state => state.activeQuestionAnswer)

	const activateBuzzers = trpc.buzzer.activateBuzzers.useMutation()
	const active = usePlayerStore(state => state.activeBuzzers)

	const endQuestion = trpc.question.endQuestion.useMutation()

	return (
		<>
			<Text size={32} align='center'>{answer}</Text>

			<Group position='center'>
				<Button
					color='green.9'
					disabled={active}
					onClick={() => {
						activateBuzzers.mutate()
					}}
				>
					Activate Buzzers
				</Button>

				<Button color='red.9' onClick={() => {
					endQuestion.mutate()
				}}>
					End Question
				</Button>
			</Group>
		</>
	)
}

export default Question