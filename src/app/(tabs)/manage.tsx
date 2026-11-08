import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native'
import ManageItem from '../../components/ManageItem'
import { deleteProduct, getProducts } from '../../services/productService'
import { Product } from '../../types/product'
export default function ManageScreen() {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	const handleEdit = (item: Product) => {
		router.push({
			pathname: '/edit/edit',
			params: {
				id: String(item.id),
				nomi: item.nomi,
				materiali: item.materiali,
				rangi: item.rangi,
				razmeri: item.razmeri,
				narxi: String(item.narxi),
			},
		})
	}

	useFocusEffect(
		useCallback(() => {
			getProducts()
				.then(setProducts)
				.catch(err => console.log('Xato:', err))
				.finally(() => setLoading(false))
		}, []),
	)

	const handleDelete = (id: number) => {
		Alert.alert("O'chirish", "Rostdan o'chirasizmi?", [
			{ text: 'Bekor qilish', style: 'cancel' },
			{
				text: "O'chirish",
				style: 'destructive',
				onPress: async () => {
					try {
						await deleteProduct(id)
						setProducts(prev => prev.filter(p => p.id !== id))
					} catch (err) {
						Alert.alert('Xato', "O'chirib bo'lmadi")
					}
				},
			},
		])
	}

	if (loading) {
		return <ActivityIndicator className='flex-1' size='large' />
	}

	return (
		<View className='flex-1 pt-16 px-4 bg-white'>
			<Text className='text-3xl font-bold mb-4'>Boshqarish</Text>
			<FlatList
				data={products}
				keyExtractor={item => String(item.id)}
				renderItem={({ item }) => (
					<ManageItem item={item} onDelete={handleDelete} onEdit={handleEdit} />
				)}
				ListEmptyComponent={
					<Text className='text-center text-gray-500 mt-10'>
						Mahsulotlar yo'q
					</Text>
				}
			/>
		</View>
	)
}
