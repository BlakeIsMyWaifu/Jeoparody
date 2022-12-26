import { Center, Group, Stack, Text, Title } from '@mantine/core'
import { useBoardData } from 'hooks/useBoardData'
import { type FC } from 'react'

const Board: FC = () => {

	const board = useBoardData()

	return (
		<Group
			grow
			position='apart'
			style={{
				gridArea: 'board'
			}}>
			{
				Object.entries(board).map(([category, squares]) => {
					return <Stack key={category} style={{
						height: '100%'
					}}>
						<Square text={category} />
						{
							squares.map((square, i) => {
								return <Square
									key={i}
									amount={square ? (i + 1) * 200 : undefined}
								/>
							})
						}
					</Stack>
				})
			}
		</Group>
	)
}

interface SquareProps {
	text?: string;
	amount?: number;
}

const Square: FC<SquareProps> = ({ text, amount }) => {
	return (
		<Center style={{
			border: 'white 2px solid',
			height: '100%'
		}}>
			{text && <Title order={2} align='center'>{text}</Title>}
			{amount && <Text size='xl'>£{amount}</Text>}
		</Center>
	)
}

export default Board