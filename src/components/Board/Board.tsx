import { Box, Center, createStyles, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { type FC } from 'react'
import { useBoardStore } from 'state/boardClientStore'
import { useHostStore } from 'state/hostClientStore'
import { trpc } from 'utils/trpc'
import Question from './Question'

interface UseStyleProps {
	hover?: boolean;
	inactive?: boolean;
}

const useStyles = createStyles((theme, { hover, inactive }: UseStyleProps) => ({
	container: {
		gridArea: 'board',
		position: 'relative'
	},
	maxHeight: {
		height: '100%'
	},
	square: {
		height: '100%',
		visibility: inactive ? 'hidden' : 'visible',
		'&:hover': hover && {
			backgroundColor: theme.colors.dark[5],
			cursor: 'pointer'
		}
	}
}))

const Board: FC = () => {

	const { classes } = useStyles({})

	const board = useBoardStore(state => state.board)

	const question = useBoardStore(state => state.question)

	return (
		<Box className={classes.container}>
			{
				Object.keys(board).length
					? <Group
						grow
						position='apart'
						className={classes.maxHeight}
					>
						{
							Object.entries(board).map(([category, squares]) => {
								return <Stack key={category} style={{
									height: '100%'
								}}>
									<CategorySquare category={category} />
									{
										squares.map((active, i) => {
											return <QuestionSquare
												key={i}
												category={category}
												index={i}
												active={active}
											/>
										})
									}
								</Stack>
							})
						}
					</Group>
					: <EmptyBoard />
			}
			{question && <Question />}
		</Box>
	)
}

interface CategorySquareProps {
	category: string;
}

const CategorySquare: FC<CategorySquareProps> = ({ category }) => {

	const { classes } = useStyles({})

	return (
		<Paper className={classes.square}>
			<Center className={classes.maxHeight}>
				<Title order={2} align='center'>{category}</Title>
			</Center>
		</Paper>
	)
}

interface QuestionSquareProps extends CategorySquareProps {
	index: number;
	active: boolean;
}

const QuestionSquare: FC<QuestionSquareProps> = ({ category, index, active }) => {

	const isHost = useHostStore(state => state.isHost)
	const setActiveQuestionAnswer = useHostStore(state => state.setActiveQuestionAnswer)

	const { classes } = useStyles({ hover: isHost, inactive: !active })

	const selectQuestion = trpc.question.selectQuestion.useMutation({
		onSuccess: data => {
			setActiveQuestionAnswer(data?.answer ?? null)
		}
	})

	return (
		<Paper className={classes.square} onClick={() => {
			if (!isHost || !active) return
			selectQuestion.mutate({ category, index })
		}}>
			<Center className={classes.maxHeight}>
				<Text size='xl'>£{(index + 1) * 200}</Text>
			</Center>
		</Paper>
	)
}

const EmptyBoard: FC = () => {

	const { classes } = useStyles({})

	return (
		<Paper className={classes.maxHeight}>
			<Center className={classes.maxHeight}>
				<Title order={2}>Waiting for host to import a question board . . .</Title>
			</Center>
		</Paper>
	)
}

export default Board