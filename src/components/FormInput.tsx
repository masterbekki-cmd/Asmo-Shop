import { Text, TextInput, TextInputProps, View } from 'react-native'

type Props = TextInputProps & { label: string }

export default function FormInput({ label, ...rest }: Props) {
	return (
		<View className='mb-3'>
			<Text className='mb-1 text-gray-700'>{label}</Text>
			<TextInput
				className='border border-gray-300 rounded-lg px-3 py-2 bg-white'
				{...rest}
			/>
		</View>
	)
}
