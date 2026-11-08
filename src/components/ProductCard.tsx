import { Text, View } from 'react-native'
import { Product } from '../types/product'

export default function ProductCard({ item }: { item: Product }) {
	return (
		<View className='p-4 mb-3 rounded-2xl bg-white border border-gray-200 shadow-sm'>
			<View className='flex-row justify-between items-start mb-2'>
				<Text className='text-xl font-bold flex-1 mr-2'>{item.nomi}</Text>
				<View className='bg-green-100 rounded-full px-3 py-1'>
					<Text className='text-green-700 font-bold'>
						{item.narxi.toLocaleString()} so'm
					</Text>
				</View>
			</View>

			<View className='flex-row flex-wrap'>
				<View className='bg-gray-100 rounded-full px-3 py-1 mr-2 mb-1'>
					<Text className='text-gray-700'>🧵 {item.materiali}</Text>
				</View>
				<View className='bg-gray-100 rounded-full px-3 py-1 mr-2 mb-1'>
					<Text className='text-gray-700'>🎨 {item.rangi}</Text>
				</View>
				<View className='bg-gray-100 rounded-full px-3 py-1 mr-2 mb-1'>
					<Text className='text-gray-700'>📏 {item.razmeri}</Text>
				</View>
			</View>
		</View>
	)
}
