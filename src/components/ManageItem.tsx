import { Text, TouchableOpacity, View } from 'react-native'
import { Product } from '../types/product'

type Props = {
	item: Product
	onDelete: (id: number) => void
	onEdit: (item: Product) => void
}

export default function ManageItem({ item, onDelete, onEdit }: Props) {
	return (
		<View className='p-4 mb-2 rounded-xl bg-gray-100'>
			<Text className='text-base font-semibold'>{item.nomi}</Text>
			<Text className='text-gray-600 text-sm mb-3'>
				{item.materiali} · {item.rangi} · {item.razmeri} ·{' '}
				{item.narxi.toLocaleString()} so'm
			</Text>

			<View className='flex-row'>
				<TouchableOpacity
					onPress={() => onEdit(item)}
					className='bg-blue-600 rounded-lg px-4 py-2 mr-2'
				>
					<Text className='text-white font-semibold'>Tahrirlash</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => onDelete(item.id)}
					className='bg-red-500 rounded-lg px-4 py-2'
				>
					<Text className='text-white font-semibold'>O'chirish</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
