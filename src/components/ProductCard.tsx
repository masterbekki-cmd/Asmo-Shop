import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { Product } from '../types/product'

type IconName = keyof typeof Ionicons.glyphMap

function Chip({ icon, text }: { icon: IconName; text: string }) {
	if (!text) return null
	return (
		<View className='flex-row items-center bg-slate-100 rounded-full px-3 py-1 mr-2 mb-2'>
			<Ionicons name={icon} size={14} color='#475569' />
			<Text className='ml-1 text-sm text-slate-600'>{text}</Text>
		</View>
	)
}

export default function ProductCard({ item }: { item: Product }) {
	const [imgError, setImgError] = useState(false)
	const showImage = !!item.rasm && !imgError

	return (
		<View
			className='bg-white rounded-3xl mb-4 border border-slate-100 overflow-hidden'
			style={{
				elevation: 3,
				shadowColor: '#000',
				shadowOpacity: 0.08,
				shadowRadius: 8,
				shadowOffset: { width: 0, height: 3 },
			}}
		>
			{showImage ? (
				<Image
					source={{ uri: item.rasm as string }}
					style={{ width: '100%', aspectRatio: 4 / 3 }}
					contentFit='cover'
					transition={200}
					onError={() => setImgError(true)}
				/>
			) : (
				<View
					className='bg-blue-100 items-center justify-center'
					style={{ width: '100%', aspectRatio: 4 / 3 }}
				>
					<Text className='text-5xl font-bold text-blue-600'>
						{item.nomi.charAt(0).toUpperCase()}
					</Text>
				</View>
			)}

			<View className='p-4'>
				<View className='flex-row items-center justify-between mb-3'>
					<Text
						className='text-lg font-bold text-slate-900 flex-1 mr-2'
						numberOfLines={1}
					>
						{item.nomi}
					</Text>
					<Text className='text-xs text-slate-400'>#{item.id}</Text>
				</View>

				<View className='flex-row flex-wrap'>
					<Chip icon='layers-outline' text={item.materiali} />
					<Chip icon='color-palette-outline' text={item.rangi} />
					<Chip icon='resize-outline' text={item.razmeri} />
				</View>

				<View className='flex-row items-center justify-between pt-3 mt-1 border-t border-slate-100'>
					<Text className='text-slate-500'>Narxi</Text>
					<Text className='text-xl font-extrabold text-blue-600'>
						{item.narxi.toLocaleString()} so'm
					</Text>
				</View>
			</View>
		</View>
	)
}
