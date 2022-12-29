import { Button, Modal, Text } from '@mantine/core'
import { type FC } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { trpc } from 'utils/trpc'
import { z } from 'zod'

const ImportQuestions: FC = () => {

	const fileInputRef = useRef<HTMLInputElement>(null)

	const [modalMessage, setModalMessage] = useState('')
	const [modalState, setModalState] = useState(false)
	const handleError = (message: string): void => {
		setModalMessage(message)
		setModalState(true)
	}

	const importQuestions = trpc.board.importQuestions.useMutation()

	return (
		<>
			<Button fullWidth onClick={() => {
				fileInputRef.current?.click()
			}}>
				Import Questions
			</Button>

			<input
				hidden
				ref={fileInputRef}
				type='file'
				accept='application/json'
				onInput={event => {
					const reader = new FileReader()
					reader.onload = event => {
						if (typeof event.target?.result !== 'string') return

						try {
							const json = JSON.parse(event.target.result)
							if (!validateJson(json)) return handleError('Invalid JSON')

							const validJson = validateSchema(json)
							if (!validJson.success) return handleError('Invalid Schema')

							importQuestions.mutate(validJson.data)
						} catch (error) {
							if (error instanceof Error) {
								handleError(error.message)
							}
						}
					}
					const files = (event.target as HTMLInputElement).files
					if (files) reader.readAsText(files[0])
				}}
			/>

			<ErrorModal
				message={modalMessage}
				modalState={modalState}
				setModalState={setModalState}
			/>
		</>
	)
}

interface ErrorModalProps {
	message: string;
	modalState: boolean;
	setModalState: (state: boolean) => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ message, modalState, setModalState }) => {
	return (
		<Modal
			centered
			opened={modalState}
			title='Import Question Error'
			onClose={() => {
				setModalState(false)
			}}
		>
			<Text color='red'>{message}</Text>
		</Modal>
	)
}

const validateJson = (data: unknown): boolean => {
	type Literal = boolean | null | number | string
	type Json = Literal | { [key: string]: Json } | Json[]

	const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
	const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
		z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
	)

	const result = jsonSchema.safeParse(data)
	if (!result.success) console.error(result.error)

	return result.success
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const validateSchema = (data: unknown) => {
	const schema = z.record(z.array(z.object({
		question: z.string(),
		answer: z.string(),
		image: z.string().optional()
	})).length(5))

	const result = schema.safeParse(data)
	if (!result.success) console.error(result.error)

	return result
}

export default ImportQuestions