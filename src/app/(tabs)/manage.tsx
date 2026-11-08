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
				rasm: item.rasm ?? '',
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
	const middlePrice =
		products.reduce((sum, item) => sum + item.narxi, 0) / products.length

	if (loading) {
		return <ActivityIndicator className='flex-1' size='large' />
	}

	return (
		<View className='flex-1 pt-20 px-4 bg-gray-100'>
			<View className='mb-4'>
				<Text className='text-3xl font-bold'>Boshqaruv Paneli</Text>
				<Text className='text-sm text-gray-400'>
					Mahsulotlarni tahrirlash va o'chirish
				</Text>
			</View>
			<View className='flex-row items-center justify-between mb-6'>
				<View className='w-[48%] border rounded-2xl border-gray-200 pl-3 py-2 bg-white flex-row items-center gap-4'>
					<View className='w-10 h-10 bg-blue-100 rounded-xl'></View>
					<View className='flex-1'>
						<Text className='text-sm text-gray-400'>JAMI MAHSULOT</Text>
						<Text className='text-lg font-bold'>{products.length}</Text>
					</View>
				</View>
				<View className='w-[48%] border rounded-2xl border-gray-200 pl-3 py-2 bg-white flex-row items-center gap-4'>
					<View className='w-10 h-10 bg-green-100 rounded-xl'></View>
					<View className='flex-1'>
						<Text className='text-sm text-gray-400'>O'RTACHA NARX</Text>
						<Text className='text-lg font-bold'>
							{middlePrice.toLocaleString('de-DE')}
						</Text>
					</View>
				</View>
			</View>
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
