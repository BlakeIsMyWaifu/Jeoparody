import { Button, Center, Group, NumberInput, Paper, Stack, Text, Title } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { useMemo, type FC } from 'react'
import { useBoardStore } from 'state/boardClientStore'
import { useHostStore } from 'state/hostClientStore'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'
import { QuestionQuestion } from './Question'

const DailyDouble: FC = () => {

	const playerName = usePlayerStore(state => state.playerName)
	const lastRoundWinner = useBoardStore(state => state.lastRoundWinner)

	const isHost = useHostStore(state => state.isHost)

	const dailyDoubleWager = useBoardStore(state => state.dailyDoubleWager)

	return (
		<Paper component={Center} style={{
			gridArea: 'board',
			height: '100%'
		}}>
			<Stack justify='center' style={{
				height: '100%'
			}}>
				{
					dailyDoubleWager
						? <>
							<QuestionQuestion />
							<Text align='center'>Wager Amount: £{dailyDoubleWager}</Text>
						</>
						: <>
							<Title align='center'>Daily Double</Title>
							{playerName === lastRoundWinner && <Wager />}
						</>
				}
				{isHost && <Host />}
			</Stack>
		</Paper>
	)
}

const Wager: FC = () => {

	const [wagerAmount, setWagerAmount] = useInputState(100)

	const players = usePlayerStore(state => state.players)
	const playerName = usePlayerStore(state => state.playerName)
	const playerPoints = players[playerName]

	const highestPoints = useMemo(() => Math.max(...Object.values(players)), [players])
	const maxWager = playerPoints < 100 ? highestPoints : playerPoints

	const submitWager = trpc.points.submitWager.useMutation()

	return (
		<>
			<NumberInput
				label='Wager Amount'
				description={`Minium 100, Maximum ${maxWager}`}
				value={wagerAmount}
				onChange={setWagerAmount}
				min={100}
				max={maxWager}
				step={100}
				stepHoldDelay={500}
				stepHoldInterval={stepCount => Math.max(1000 / stepCount ** 2, 25)}
			/>
			<Button onClick={() => {
				submitWager.mutate(wagerAmount)
			}}>Confirm</Button>
		</>
	)
}

const Host: FC = () => {

	const answer = useHostStore(state => state.activeQuestionAnswer)

	const endQuestion = trpc.question.endQuestion.useMutation()
	const adjustPoints = trpc.points.adjustPoints.useMutation()
	const submitWager = trpc.points.submitWager.useMutation()

	const lastRoundWinner = useBoardStore(state => state.lastRoundWinner) ?? ''
	const dailyDoubleWager = useBoardStore(state => state.dailyDoubleWager)

	const handleAnswer = async (correct: boolean): Promise<void> => {
		await adjustPoints.mutateAsync({
			player: lastRoundWinner,
			amount: dailyDoubleWager * (correct ? 1 : -1)
		})
		await endQuestion.mutateAsync()
		await submitWager.mutateAsync(0)
	}

	return (
		<>
			<Text size={32} align='center'>{answer}</Text>

			<Group position='center'>
				<Button
					disabled={!dailyDoubleWager}
					color='green.9'
					onClick={() => {
						handleAnswer(true)
					}}
				>
					Correct
				</Button>

				<Button
					disabled={!dailyDoubleWager}
					color='red.9'
					onClick={async () => {
						handleAnswer(false)
					}}
				>
					Wrong
				</Button>

				<Button color='red.9' onClick={() => {
					endQuestion.mutate()
				}}>
					Cancel Question
				</Button>
			</Group>
		</>
	)
}

export default DailyDouble