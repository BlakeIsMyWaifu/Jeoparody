import { Box, Divider, Group } from '@mantine/core'
import { type FC, type ReactNode } from 'react'
import AnswerButton from './AnswerButton'

import Buzzer from './Buzzer'

interface HostBuzzerProps {
	playerName: string;
	children?: ReactNode;
}

const HostBuzzer: FC<HostBuzzerProps> = ({ playerName }) => {
	return (
		<Buzzer playerName={playerName}>
			<Box>
				<Divider label='Answer' labelPosition='center' />
				<Group position='center'>
					<AnswerButton playerName={playerName} correct={true} />
					<AnswerButton playerName={playerName} correct={false} />
				</Group>
			</Box>
		</Buzzer>
	)
}

export default HostBuzzer