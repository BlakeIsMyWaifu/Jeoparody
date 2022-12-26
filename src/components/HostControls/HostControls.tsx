import { Box } from '@mantine/core'
import { type FC } from 'react'
import ImportQuestions from './ImportQuestions'

const HostControls: FC = () => {
	return (
		<Box style={{
			gridArea: 'hostControls'
		}}>
			<ImportQuestions />
		</Box>
	)
}

export default HostControls