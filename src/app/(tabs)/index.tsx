import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from 'react-native'
import ProductCard from '../../components/ProductCard'
import { getProducts } from '../../services/productService'
import { Product } from '../../types/product'

export default function HomeScreen() {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)

	const loadProducts = useCallback(async () => {
		try {
			setProducts(await getProducts())
		} catch (err) {
			console.log('Xato:', err)
		} finally {
			setLoading(false)
			setRefreshing(false)
		}
	}, [])

	useFocusEffect(
		useCallback(() => {
			loadProducts()
		}, [loadProducts]),
	)

	if (loading) {
		return <ActivityIndicator className='flex-1' size='large' />
	}

	return (
		<View className='flex-1 bg-gray-50'>
			<FlatList
				data={products}
				keyExtractor={item => String(item.id)}
				renderItem={({ item }) => <ProductCard item={item} />}
				contentContainerClassName='pt-16 pb-10'
				ItemSeparatorComponent={() => <View className='h-3' />}
				numColumns={2}
				columnWrapperStyle={{ gap: 12 }}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							setRefreshing(true)
							loadProducts()
						}}
					/>
				}
				ListHeaderComponent={
					<View className='gap-5 mb-5'>
						{/* Header */}
						<View className='flex-row items-center justify-between'>
							<Text className='text-3xl font-bold text-gray-900'>AsmoShop</Text>
							<View className='w-12 h-12 bg-blue-100 rounded-xl items-center justify-center'>
								<Text className='text-xl'>🛍️</Text>
							</View>
						</View>

						{/* Banner */}
						<View className='bg-blue-600 rounded-3xl p-5 gap-3 my-5'>
							<Text className='text-blue-100 text-xs font-bold tracking-widest'>
								ASMO SHOP
							</Text>

							<Text className='text-white text-3xl font-bold'>
								Uslubingizni biz bilan yarating!
							</Text>

							<Text className='text-blue-100 text-sm leading-6'>
								Sifatli mahsulotlar, zamonaviy dizayn va siz uchun qulay tanlov.
							</Text>

							<View className='flex-row items-center gap-2 mt-2'>
								<Ionicons name='heart' size={18} color='white' />
								<Text className='text-white text-sm font-medium'>
									Har bir tanlovda o‘ziga xoslik
								</Text>
							</View>
						</View>

						{/* Biz haqimizda */}
						<View className='gap-3 mb-5'>
							<Text className='text-xl font-bold text-gray-900'>
								Biz haqimizda
							</Text>

							<Text className='text-gray-500 text-sm leading-6 mb-3'>
								AsmoShop — didingizga mos mahsulotlarni topishingiz va o‘z
								uslubingizni yaratishingiz uchun mo‘ljallangan do‘kon.
							</Text>

							{/* Statistik kartalar */}
							<View className='flex-row gap-3'>
								<View className='flex-1 rounded-2xl bg-white p-4'>
									<Ionicons
										name='color-palette-outline'
										size={24}
										color='#2563eb'
									/>
									<Text className='mt-3 text-lg font-bold text-gray-900'>
										Uslub
									</Text>
									<Text className='mt-1 text-sm text-gray-500'>
										Har kimning o‘ziga xos tanlovi
									</Text>
								</View>

								<View className='flex-1 bg-white rounded-2xl p-4 border border-gray-100 gap-2'>
									<Ionicons
										name='shield-checkmark-outline'
										size={25}
										color='#16a34a'
									/>

									<Text className='text-xl font-bold text-gray-900'>Sifat</Text>

									<Text className='text-gray-500 text-xs'>
										Bizning ustuvorligimiz
									</Text>
								</View>
							</View>
						</View>

						{/* Mahsulotlar sarlavhasi */}
						<View className='mt-2'>
							<Text className='text-xl font-bold text-gray-900'>
								Mahsulotlarimiz
							</Text>
							<Text className='text-gray-500 text-sm mt-1'>
								Bizning mahsulotlarimiz bilan tanishing
							</Text>
						</View>
					</View>
				}
				ListEmptyComponent={
					<Text className='text-center text-gray-500 py-10'>
						Mahsulotlar yo'q
					</Text>
				}
			/>
		</View>
	)
}
