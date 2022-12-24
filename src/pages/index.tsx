import { type NextPage } from 'next'
import { Button, Modal, Title, useMantineTheme, Text, Stack, Group, TextInput } from '@mantine/core'
import { useHostStore } from 'state/hostStore'
import Host from 'components/Host'
import { useState, type FC } from 'react'
import Player from 'components/Player'
import { trpc } from 'utils/trpc'
import { usePlayerStore } from 'state/playerStore'

const Home: NextPage = () => {

	const hostActive = useHostStore(state => state.isHost)
	const playerActive = usePlayerStore(state => state.isPlayer)

	return (
		<>
			<LobbyModal />
			{(hostActive && !playerActive) && <Host />}
			{(playerActive && !hostActive) && <Player />}
			{(hostActive && playerActive) && <Text color='red'>Error: Both host and player have active states</Text>}
		</>
	)
}

const LobbyModal: FC = () => {

	const theme = useMantineTheme()

	// Player
	const playerActive = usePlayerStore(state => state.isPlayer)
	const setPlayer = usePlayerStore(state => state.setPlayer)

	const [playerNameInput, setPlayerNameInput] = useState('')
	const [playerNameInputDisabledMessage, setPlayerNameInputDisabledMessage] = useState<false | string>(false)

	const player = trpc.room.becomePlayer.useMutation({
		onSuccess: ([success, message]) => {
			if (success) {
				setPlayer(message)
			} else {
				setPlayerNameInputDisabledMessage(message)
			}
		}
	})

	// Host
	const hostActive = useHostStore(state => state.isHost)
	const becomeHost = useHostStore(state => state.becomeHost)

	const host = trpc.room.becomeHost.useMutation({
		onSuccess: data => {
			if (!data) return
			becomeHost()
		}
	})

	return !hostActive && !playerActive ? (
		<Modal
			centered
			overflow='inside'
			overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
			withCloseButton={false}
			opened={true}
			onClose={() => undefined}
		>
			<Stack>
				<Title>Jeoparody</Title>
				<Group>
					<TextInput
						value={playerNameInput}
						onChange={event => setPlayerNameInput(event.currentTarget.value)}
						placeholder='Your Name'
						label='Player Name'
						error={playerNameInputDisabledMessage}
					/>
					<Button onClick={() => {
						setPlayerNameInputDisabledMessage(false)
						player.mutate(playerNameInput)
					}}>Player</Button>
				</Group>
				<Button onClick={() => {
					host.mutate()
				}}>Host</Button>
			</Stack>
		</Modal>
	) : null
}

export default Home
