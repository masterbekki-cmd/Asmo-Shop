import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { Product } from '../types/product'

export default function ProductCard({ item }: { item: Product }) {
	const [imgError, setImgError] = useState(false)
	const showImage = !!item.rasm && !imgError

	return (
		<View
			className='flex-1 bg-white rounded-2xl overflow-hidden border border-slate-100'
			style={{
				elevation: 2,
				shadowColor: '#000',
				shadowOpacity: 0.06,
				shadowRadius: 6,
				shadowOffset: { width: 0, height: 2 },
			}}
		>
			<View className='relative'>
				{showImage ? (
					<Image
						source={{ uri: item.rasm as string }}
						style={{ width: '100%', aspectRatio: 1 }}
						contentFit='cover'
						transition={200}
						onError={() => setImgError(true)}
					/>
				) : (
					<View
						className='bg-blue-50 items-center justify-center'
						style={{ width: '100%', aspectRatio: 1 }}
					>
						<Ionicons name='image-outline' size={38} color='#2563eb' />
					</View>
				)}

				<View className='absolute top-2 right-2 bg-white/90 rounded-full p-2'>
					<Ionicons name='heart-outline' size={18} color='#475569' />
				</View>
			</View>

			<View className='p-3'>
				<Text className='text-sm font-bold text-slate-900' numberOfLines={2}>
					{item.nomi}
				</Text>

				<View className='flex-row items-center mt-2'>
					<Ionicons name='color-palette-outline' size={13} color='#94a3b8' />
					<Text className='text-xs text-slate-500 ml-1' numberOfLines={1}>
						{item.rangi || 'Rang ko‘rsatilmagan'}
					</Text>
				</View>

				<View className='flex-row items-center mt-1'>
					<Ionicons name='resize-outline' size={13} color='#94a3b8' />
					<Text className='text-xs text-slate-500 ml-1' numberOfLines={1}>
						{item.razmeri || 'Razmer ko‘rsatilmagan'}
					</Text>
				</View>

				<View className='border-t border-slate-100 mt-3 pt-3'>
					<Text className='text-base font-extrabold text-blue-600'>
						{item.narxi.toLocaleString()} so'm
					</Text>
				</View>
			</View>
		</View>
	)
}
