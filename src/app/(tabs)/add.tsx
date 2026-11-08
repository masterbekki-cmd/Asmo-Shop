import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FormInput from '../../components/FormInput'
import { createProduct } from '../../services/productService'

export default function AddScreen() {
	const router = useRouter()

	const [form, setForm] = useState({
		nomi: '',
		materiali: '',
		rangi: '',
		razmeri: '',
		narxi: '',
		rasm: '',
	})

	const [saving, setSaving] = useState(false)

	const handleChange = (key: keyof typeof form, value: string) => {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	const handleSubmit = async () => {
		if (!form.nomi.trim() || !form.narxi.trim()) {
			Alert.alert('Xato', 'Nomi va narxi majburiy')
			return
		}

		try {
			setSaving(true)

			await createProduct({
				...form,
				nomi: form.nomi.trim(),
				narxi: Number(form.narxi),
				rasm: form.rasm.trim() || null,
			})

			setForm({
				nomi: '',
				materiali: '',
				rangi: '',
				razmeri: '',
				narxi: '',
				rasm: '',
			})

			router.navigate('/')
		} catch (err) {
			Alert.alert('Xato', "Mahsulotni qo'shib bo'lmadi")
		} finally {
			setSaving(false)
		}
	}

	return (
		<ScrollView
			className='flex-1 bg-gray-100'
			contentContainerClassName='pt-20 px-4 pb-10'
		>
			<View className='flex-row items-center justify-between mb-6'>
				<View>
					<Text className='text-3xl font-bold'>Yangi mahsulot</Text>
					<Text className='text-sm text-gray-400'>
						Katalogga yangi kiyim yoki buyum qo'shing
					</Text>
				</View>

				<View className='rounded-xl bg-blue-100 w-10 h-10 items-center justify-center'>
					<Text className='text-blue-500 font-bold'>+</Text>
				</View>
			</View>

			<View className='mt-8 px-4 py-6 rounded-3xl bg-white'>
				{/* Mahsulot rasmi */}
				<View className='mb-4'>
					<Text className='text-base'>Mahsulot rasmi</Text>

					<View className='h-40 w-full bg-gray-50 rounded-2xl items-center justify-center mt-2 border-dashed border-2 border-gray-300'>
						<View className='h-10 w-10 bg-white rounded-full items-center justify-center'>
							<Text className='text-xl font-bold text-blue-500'>+</Text>
						</View>

						<Text className='text-gray-500 mt-2'>
							Rasm yuklang yoki URL kiriting
						</Text>
					</View>
				</View>

				{/* Rasm URL */}
				<FormInput
					label='Rasm havolasi (ixtiyoriy)'
					value={form.rasm}
					onChangeText={value => handleChange('rasm', value)}
					placeholder='https://...'
					autoCapitalize='none'
					keyboardType='url'
					style={{ borderRadius: 12 }}
				/>

				{/* Nomi */}
				<FormInput
					label='Nomi'
					value={form.nomi}
					onChangeText={value => handleChange('nomi', value)}
					placeholder='Masalan: Dvoyka, Shim ...'
					style={{ borderRadius: 12 }}
				/>

				{/* Qo'shimcha ma'lumotlar */}
				<View className='flex-row flex-wrap gap-3'>
					<View className='w-[48%]'>
						<FormInput
							label='Materiali'
							value={form.materiali}
							onChangeText={value => handleChange('materiali', value)}
							placeholder='Xeber, Paxta ...'
						/>
					</View>

					<View className='w-[48%]'>
						<FormInput
							label='Rangi'
							value={form.rangi}
							onChangeText={value => handleChange('rangi', value)}
							placeholder='Bardoviy, Qora ...'
						/>
					</View>

					<View className='w-[48%]'>
						<FormInput
							label='Razmeri'
							value={form.razmeri}
							onChangeText={value => handleChange('razmeri', value)}
							placeholder='44, 46, 48 ...'
						/>
					</View>

					<View className='w-[48%]'>
						<FormInput
							label='Narxi'
							value={form.narxi}
							onChangeText={value => handleChange('narxi', value)}
							placeholder='120000 ...'
							keyboardType='numeric'
						/>
					</View>
				</View>

				{/* Saqlash */}
				<TouchableOpacity
					onPress={handleSubmit}
					disabled={saving}
					className='bg-blue-600 rounded-2xl py-4 mt-2'
				>
					<Text className='text-white text-center font-semibold'>
						{saving ? 'Saqlanmoqda...' : "Qo'shish"}
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}
