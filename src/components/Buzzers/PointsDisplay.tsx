import { ActionIcon, Button, Group, Modal, NumberInput, Stack, Text } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons'
import { type Dispatch, type SetStateAction, type FC, useState } from 'react'
import { useHostStore } from 'state/hostClientStore'
import { usePlayerStore } from 'state/playerClientStore'
import { trpc } from 'utils/trpc'

interface PointsDisplayProps {
	playerName: string;
}

const PointsDisplay: FC<PointsDisplayProps> = ({ playerName }) => {

	const playerPoints = usePlayerStore(state => state.players[playerName])

	const isHost = useHostStore(state => state.isHost)

	const points = <Text align='center'>£{`${playerPoints}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>

	const [opened, setOpened] = useState(false)
	const [inputValue, setInputValue] = useInputState(playerPoints)

	return isHost ? (
		<>
			<PointsModal
				playerName={playerName}
				opened={opened}
				setOpened={setOpened}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
			<Group
				position='center'
				align='end'
				style={{
					paddingLeft: '36px'
				}}
			>
				{points}
				<ActionIcon
					variant='light'
					size={20}
					onClick={() => {
						setOpened(true)
						setInputValue(playerPoints)
					}}
				>
					<IconEdit size={20} />
				</ActionIcon>
			</Group>
		</>
	) : points
}

interface PointsModalProps {
	playerName: string;
	opened: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
	inputValue: number;
	setInputValue: ReturnType<typeof useInputState<number>>[1];
}

const PointsModal: FC<PointsModalProps> = ({ playerName, opened, setOpened, inputValue, setInputValue }) => {

	const adjustPoints = trpc.points.adjustPoints.useMutation()

	const playerPoints = usePlayerStore(state => state.players[playerName])

	return (
		<Modal
			centered
			opened={opened}
			onClose={() => setOpened(false)}
			withCloseButton={false}
		>
			<Stack>
				<Text align='center'>Editing <strong>{playerName}</strong>{`'${playerName.slice(-1) === 's' ? '' : 's'}`} points</Text>
				<NumberInput
					label='Updated Points'
					value={inputValue}
					onChange={setInputValue}
					parser={value => value?.replace(/\$\s?|(,*)/g, '')}
					formatter={value =>
						!Number.isNaN(parseFloat(value ?? '')) || value === '-'
							? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							: '$ '
					}
					step={100}
					stepHoldDelay={500}
					stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
				/>
				<Group position='center'>
					<Button onClick={() => setOpened(false)}>Cancel</Button>
					<Button onClick={() => {
						adjustPoints.mutate({
							player: playerName,
							amount: inputValue - playerPoints
						})
						setOpened(false)
					}}>Submit</Button>
				</Group>
			</Stack>
		</Modal>
	)
}

export default PointsDisplay