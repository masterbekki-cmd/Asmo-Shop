import { API_URL } from '../config/api'
import { Product, ProductInput } from '../types/product'

export async function getProducts(): Promise<Product[]> {
	const res = await fetch(`${API_URL}/products`)
	if (!res.ok) throw new Error('Mahsulotlarni olib bo‘lmadi')
	return res.json()
}

export async function createProduct(data: ProductInput) {
	const res = await fetch(`${API_URL}/products`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Qo‘shib bo‘lmadi')
	return res.json()
}

export async function updateProduct(id: number, data: ProductInput) {
	const res = await fetch(`${API_URL}/products/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Yangilab bo‘lmadi')
	return res.json()
}

export async function deleteProduct(id: number) {
	const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
	if (!res.ok) throw new Error('O‘chirib bo‘lmadi')
	return res.json()
}
