import { type NextPage } from 'next'
import { Button, Modal, Title, useMantineTheme, Stack, Group, TextInput } from '@mantine/core'
import { useHostStore } from 'state/hostStore'
import { useState } from 'react'
import { trpc } from 'utils/trpc'
import { usePlayerStore } from 'state/playerStore'
import { useRouter } from 'next/router'

const HomePage: NextPage = () => {

	const theme = useMantineTheme()

	const router = useRouter()

	// Player
	const playerActive = usePlayerStore(state => state.isPlayer)
	const setPlayer = usePlayerStore(state => state.setPlayer)

	const [playerNameInput, setPlayerNameInput] = useState('')
	const [playerNameInputDisabledMessage, setPlayerNameInputDisabledMessage] = useState<false | string>(false)

	const player = trpc.room.becomePlayer.useMutation({
		onSuccess: ([success, message]) => {
			if (success) {
				setPlayer(message)
				router.push('/play')
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
			router.push('/host')
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

export default HomePage
