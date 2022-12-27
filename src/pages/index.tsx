import { type NextPage } from 'next'
import { Button, Modal, Title, Stack, Group, TextInput } from '@mantine/core'
import { useHostStore } from 'state/hostClientStore'
import { useState, type FC } from 'react'
import { trpc } from 'utils/trpc'
import { usePlayerStore } from 'state/playerClientStore'
import { useRouter } from 'next/router'
import { useInputState } from '@mantine/hooks'

const HomePage: NextPage = () => {
	return (
		<Modal
			centered
			overflow='inside'
			withCloseButton={false}
			opened={true}
			onClose={() => undefined}
		>
			<Stack>
				<Title>Jeoparody</Title>
				<Player />
				<Host />
			</Stack>
		</Modal>
	)
}

const Player: FC = () => {

	const router = useRouter()

	const setPlayer = usePlayerStore(state => state.setPlayer)

	const [playerNameInput, setPlayerNameInput] = useInputState('')
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

	return (
		<Group>
			<TextInput
				value={playerNameInput}
				onChange={setPlayerNameInput}
				placeholder='Your Name'
				label='Player Name'
				error={playerNameInputDisabledMessage}
			/>
			<Button onClick={() => {
				setPlayerNameInputDisabledMessage(false)
				player.mutate(playerNameInput)
			}}>Player</Button>
		</Group>
	)
}

const Host: FC = () => {

	const router = useRouter()

	const becomeHost = useHostStore(state => state.becomeHost)

	const host = trpc.room.becomeHost.useMutation({
		onSuccess: data => {
			if (!data) return
			becomeHost()
			router.push('/host')
		}
	})

	return (
		<Button onClick={() => {
			host.mutate()
		}}>Host</Button>
	)
}

export default HomePage
