import { ActionIcon, Button, Group, Modal, Stack, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { type Dispatch, type SetStateAction, useState, type FC } from 'react'
import { useHostStore } from 'state/hostClientStore'
import { trpc } from 'utils/trpc'

interface PlayerNameDisplayProps {
	playerName: string;
}

const PlayerNameDisplay: FC<PlayerNameDisplayProps> = ({ playerName }) => {

	const isHost = useHostStore(state => state.isHost)

	const [opened, setOpened] = useState(false)

	const name = <Text align='center'>{playerName}</Text>

	return isHost ? (
		<>
			<KickModal
				playerName={playerName}
				opened={opened}
				setOpened={setOpened}
			/>
			<Group
				position='center'
				align='end'
				style={{
					paddingLeft: '36px'
				}}
			>
				{name}
				<ActionIcon
					variant='light'
					size={20}
					onClick={() => {
						setOpened(true)
					}}
				>
					<IconTrash size={20} />
				</ActionIcon>
			</Group>
		</>
	) : name
}

interface KickModalProps {
	playerName: string;
	opened: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
}

const KickModal: FC<KickModalProps> = ({ playerName, opened, setOpened }) => {

	const kickPlayer = trpc.room.kickPlayer.useMutation()

	return (
		<Modal
			centered
			opened={opened}
			onClose={() => setOpened(false)}
			withCloseButton={false}
		>
			<Stack>
				<Text align='center'>Are you sure you want to kick <strong>{playerName}</strong></Text>
				<Group position='center'>
					<Button onClick={() => setOpened(false)}>Cancel</Button>
					<Button onClick={() => { kickPlayer.mutate(playerName) }}>Kick</Button>
				</Group>
			</Stack>
		</Modal>
	)
}

export default PlayerNameDisplay