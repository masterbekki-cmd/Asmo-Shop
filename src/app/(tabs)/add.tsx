import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native'
import FormInput from '../../components/FormInput'
import { createProduct } from '../../services/productService'

export default function AddScreen() {
	const router = useRouter()
	const [nomi, setNomi] = useState('')
	const [materiali, setMateriali] = useState('')
	const [rangi, setRangi] = useState('')
	const [razmeri, setRazmeri] = useState('')
	const [narxi, setNarxi] = useState('')
	const [saving, setSaving] = useState(false)

	const handleSubmit = async () => {
		if (!nomi.trim() || !narxi.trim()) {
			Alert.alert('Xato', 'Nomi va narxi majburiy')
			return
		}

		try {
			setSaving(true)
			await createProduct({
				nomi: nomi.trim(),
				materiali: materiali.trim(),
				rangi: rangi.trim(),
				razmeri: razmeri.trim(),
				narxi: Number(narxi),
			})

			setNomi('')
			setMateriali('')
			setRangi('')
			setRazmeri('')
			setNarxi('')

			router.navigate('/')
		} catch (err) {
			Alert.alert('Xato', "Mahsulotni qo'shib bo'lmadi")
		} finally {
			setSaving(false)
		}
	}

	return (
		<ScrollView
			className='flex-1 bg-white'
			contentContainerClassName='pt-16 px-4 pb-10'
		>
			<Text className='text-3xl font-bold mb-4'>Mahsulot qo'shish</Text>

			<FormInput
				label='Nomi'
				value={nomi}
				onChangeText={setNomi}
				placeholder='Dvoyka'
			/>
			<FormInput
				label='Materiali'
				value={materiali}
				onChangeText={setMateriali}
				placeholder='Xebe'
			/>
			<FormInput
				label='Rangi'
				value={rangi}
				onChangeText={setRangi}
				placeholder='Bardoviy'
			/>
			<FormInput
				label='Razmeri'
				value={razmeri}
				onChangeText={setRazmeri}
				placeholder='44'
			/>
			<FormInput
				label='Narxi'
				value={narxi}
				onChangeText={setNarxi}
				placeholder='350000'
				keyboardType='numeric'
			/>

			<TouchableOpacity
				onPress={handleSubmit}
				disabled={saving}
				className='bg-blue-600 rounded-lg py-3 mt-2'
			>
				<Text className='text-white text-center font-semibold'>
					{saving ? 'Saqlanmoqda...' : "Qo'shish"}
				</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}
