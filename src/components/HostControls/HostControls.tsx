import { Divider, Paper, ScrollArea, Stack } from '@mantine/core'
import { type FC } from 'react'
import ImportQuestions from './ImportQuestions'

const HostControls: FC = () => {
	return (
		<Paper
			p='xs'
			component={ScrollArea}
			type='auto'
			style={{
				gridArea: 'hostControls'
			}}
		>
			<Stack>
				<Divider label='Host Controls' labelPosition='center' />
				<ImportQuestions />
			</Stack>
		</Paper>
	)
}

export default HostControls