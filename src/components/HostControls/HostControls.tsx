import { Divider, Paper, ScrollArea, Stack } from '@mantine/core'
import { type FC } from 'react'
import BoardScale from './BoardScale'
import ImportQuestions from './ImportQuestions'

const HostControls: FC = () => {
	return (
		<Paper
			p='xs'
			component={ScrollArea}
			type='auto'
			style={{
				minWidth: '180px',
				height: '200px'
			}}
		>
			<Stack>
				<Divider label='Host Controls' labelPosition='center' />
				<ImportQuestions />
				<BoardScale />
			</Stack>
		</Paper>
	)
}

export default HostControls