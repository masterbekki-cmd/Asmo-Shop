const db = require('../config/db')

exports.getAll = async (req, res) => {
	const { rows } = await db.query('SELECT * FROM products ORDER BY id')
	res.json(rows)
}

exports.create = async (req, res) => {
	const { nomi, materiali, rangi, razmeri, narxi } = req.body
	const { rows } = await db.query(
		'INSERT INTO products (nomi, materiali, rangi, razmeri, narxi) VALUES ($1, $2, $3, $4, $5) RETURNING id',
		[nomi, materiali, rangi, razmeri, narxi],
	)
	res.status(201).json({ id: rows[0].id })
}

exports.update = async (req, res) => {
	const { nomi, materiali, rangi, razmeri, narxi } = req.body
	await db.query(
		'UPDATE products SET nomi=$1, materiali=$2, rangi=$3, razmeri=$4, narxi=$5 WHERE id=$6',
		[nomi, materiali, rangi, razmeri, narxi, req.params.id],
	)
	res.json({ message: 'Yangilandi' })
}

exports.remove = async (req, res) => {
	await db.query('DELETE FROM products WHERE id=$1', [req.params.id])
	res.json({ message: "O'chirildi" })
}
