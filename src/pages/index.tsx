import { type NextPage } from 'next'
import { Button, Modal, Title, Stack, TextInput, Divider, useMantineTheme, ActionIcon, Group, Text } from '@mantine/core'
import { useHostStore } from 'state/hostClientStore'
import { useState, type FC } from 'react'
import { trpc } from 'utils/trpc'
import { usePlayerStore } from 'state/playerClientStore'
import { useInputState } from '@mantine/hooks'
import { IconArrowRight } from '@tabler/icons-react'
import Layout from 'components/Layout'
import { useAllData } from 'hooks/useAllData'

const HomePage: NextPage = () => {

	useAllData()

	const inGame = usePlayerStore(state => state.inGame)

	return inGame ? <Layout /> : <HomeModal />
}

const HomeModal: FC = () => {
	return (
		<Modal
			centered
			withCloseButton={false}
			opened={true}
			onClose={() => undefined}
		>
			<Stack spacing='xl'>
				<Title align='center'>Jeoparody</Title>
				<Online />
				<Player />
				<Host />
			</Stack>
		</Modal>
	)
}

const Online: FC = () => {

	const hasHost = useHostStore(state => state.hasHost)

	const players = usePlayerStore(state => state.players)

	return (
		<>
			<Divider label='Online' labelPosition='center'/>
			<Group position='center'>
				<Text color={hasHost ? 'green' : 'red'}>Host: {hasHost.toString()}</Text>
				<Divider orientation='vertical'/>
				<Text>Players: {Object.keys(players).length}</Text>
			</Group>
		</>
	)
}

const Player: FC = () => {

	const theme = useMantineTheme()

	const setPlayer = usePlayerStore(state => state.setPlayer)

	const setInGame = usePlayerStore(state => state.setInGame)

	const [playerNameInput, setPlayerNameInput] = useInputState('')
	const [playerNameInputDisabledMessage, setPlayerNameInputDisabledMessage] = useState<false | string>(false)

	const player = trpc.room.becomePlayer.useMutation({
		onSuccess: ([success, message]) => {
			if (success) {
				setPlayer(message)
				setInGame(true)
			} else {
				setPlayerNameInputDisabledMessage(message)
			}
		}
	})

	return (
		<>
			<Divider label='Player' labelPosition='center'/>
			<TextInput
				value={playerNameInput}
				onChange={setPlayerNameInput}
				placeholder='Your Name'
				label='Player Name'
				error={playerNameInputDisabledMessage}
				onKeyDown={event => {
					if (event.key !== 'Enter') return
					player.mutate(playerNameInput)
				}}
				radius='xl'
				size='md'
				rightSection={
					<ActionIcon
						size={32}
						radius='xl'
						color={theme.primaryColor} variant='filled'
						onClick={() => {
							player.mutate(playerNameInput)
						}}
					>
						<IconArrowRight size={18} stroke={1.5} />
					</ActionIcon>
				}
				rightSectionWidth={42}
				styles={{
					root: {
						height: '90px'
					},
					label: {
						marginLeft: '12px'
					},
					error: {
						marginLeft: '12px'
					}
				}}
			/>
		</>
	)
}

const Host: FC = () => {

	const becomeHost = useHostStore(state => state.becomeHost)

	const setInGame = usePlayerStore(state => state.setInGame)

	const host = trpc.room.becomeHost.useMutation({
		onSuccess: data => {
			if (!data) return
			becomeHost()
			setInGame(true)
		}
	})

	return (
		<>
			<Divider label='Host' labelPosition='center'/>
			<Button onClick={() => {
				host.mutate()
			}}>Host</Button>
		</>
	)
}

export default HomePage
