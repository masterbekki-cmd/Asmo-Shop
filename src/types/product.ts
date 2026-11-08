export type Product = {
	id: number
	nomi: string
	materiali: string
	rangi: string
	razmeri: string
	narxi: number
	rasm: string | null
}

export type ProductInput = Omit<Product, 'id'>
