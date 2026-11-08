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
		<View className='flex-1 pt-16 px-4 bg-gray-50'>
			<Text className='text-3xl font-bold'>AsmoShop</Text>
			<Text className='text-gray-500 mb-4'>
				Jami mahsulotlar: {products.length}
			</Text>

			<FlatList
				data={products}
				keyExtractor={item => String(item.id)}
				renderItem={({ item }) => <ProductCard item={item} />}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							setRefreshing(true)
							loadProducts()
						}}
					/>
				}
				ListEmptyComponent={
					<Text className='text-center text-gray-500 mt-10'>
						Mahsulotlar yo'q
					</Text>
				}
			/>
		</View>
	)
}
