export type Product = {
	id: number
	nomi: string
	materiali: string
	rangi: string
	razmeri: string
	narxi: number
}

export type ProductInput = Omit<Product, 'id'>
