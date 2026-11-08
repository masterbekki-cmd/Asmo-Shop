import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Product } from '../types/product'
type Props = {
	item: Product
	onDelete: (id: number) => void
	onEdit: (item: Product) => void
}

export default function ManageItem({ item, onDelete, onEdit }: Props) {
	const [imgError, setImgError] = useState(false)
	const showImage = !!item.rasm && !imgError
	return (
		<View
			className='bg-white rounded-2xl p-3 mb-3 border border-slate-100'
			style={{
				elevation: 2,
				shadowColor: '#000',
				shadowOpacity: 0.06,
				shadowRadius: 6,
				shadowOffset: { width: 0, height: 2 },
			}}
		>
			<View className='flex-row items-center'>
				<View className='w-12 h-12 rounded-xl bg-blue-100 items-center justify-center mr-3'>
					{showImage ? (
						<Image
							source={{ uri: item.rasm as string }}
							style={{
								width: 48,
								height: 48,
								borderRadius: 12,
								marginRight: 12,
							}}
							contentFit='cover'
							onError={() => setImgError(true)}
						/>
					) : (
						<View className='w-12 h-12 rounded-xl bg-blue-100 items-center justify-center mr-3'>
							<Text className='text-xl font-bold text-blue-600'>
								{item.nomi.charAt(0).toUpperCase()}
							</Text>
						</View>
					)}
				</View>
				<View className='flex-1'>
					<Text
						className='text-base font-semibold text-slate-900'
						numberOfLines={1}
					>
						{item.nomi}
					</Text>
					<Text className='text-xs text-slate-500' numberOfLines={1}>
						{item.materiali} · {item.rangi} · {item.razmeri}
					</Text>
					<Text className='text-sm font-bold text-blue-600 mt-0.5'>
						{item.narxi.toLocaleString()} so'm
					</Text>
				</View>
			</View>

			<View className='flex-row mt-3'>
				<TouchableOpacity
					onPress={() => onEdit(item)}
					className='flex-1 flex-row items-center justify-center bg-blue-50 rounded-xl py-2 mr-2'
				>
					<Ionicons name='create-outline' size={18} color='#2563eb' />
					<Text className='ml-1 font-semibold text-blue-600'>Tahrirlash</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => onDelete(item.id)}
					className='flex-1 flex-row items-center justify-center bg-red-50 rounded-xl py-2'
				>
					<Ionicons name='trash-outline' size={18} color='#ef4444' />
					<Text className='ml-1 font-semibold text-red-500'>O'chirish</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
