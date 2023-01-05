import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'
import { useBoardStore } from 'state/boardClientStore'
import { trpc } from 'utils/trpc'
import { usePlayerStore } from 'state/playerClientStore'
import Image from 'next/image'

const Question: FC = () => {

	const isHost = useHostStore(state => state.isHost)

	return (
		<Paper style={{
			gridArea: 'board',
			height: '100%'
		}}>
			<Stack
				justify='center'
				p='sm'
				style={{
					height: '100%'
				}}>
				<QuestionQuestion />
				{isHost && <HostQuestion />}
			</Stack>
		</Paper>
	)
}

export const QuestionQuestion: FC = () => {

	const question = useBoardStore(state => state.question.question)
	const image = useBoardStore(state => state.question.image)

	return (
		<>
			<Text size={48} align='center'>{question}</Text>
			{
				image && <Box style={{
					height: '40vh',
					position: 'relative'
				}}>
					<Image
						fill
						src={image}
						alt='Question Image'
						draggable={false}
						style={{
							objectFit: 'contain'
						}}
						onContextMenu={event => event.preventDefault()}
					/>
				</Box>
			}
		</>
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