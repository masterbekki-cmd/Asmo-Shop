const db = require('../config/db')

exports.getAll = async (req, res) => {
	const [rows] = await db.query('SELECT * FROM products')
	res.json(rows)
}

exports.create = async (req, res) => {
	const { nomi, materiali, rangi, razmeri, narxi } = req.body
	const [result] = await db.query(
		'INSERT INTO products (nomi, materiali, rangi, razmeri, narxi) VALUES (?, ?, ?, ?, ?)',
		[nomi, materiali, rangi, razmeri, narxi],
	)
	res.status(201).json({ id: result.insertId })
}

exports.update = async (req, res) => {
	const { nomi, materiali, rangi, razmeri, narxi } = req.body
	await db.query(
		'UPDATE products SET nomi=?, materiali=?, rangi=?, razmeri=?, narxi=? WHERE id=?',
		[nomi, materiali, rangi, razmeri, narxi, req.params.id],
	)
	res.json({ message: 'Yangilandi' })
}

exports.remove = async (req, res) => {
	await db.query('DELETE FROM products WHERE id=?', [req.params.id])
	res.json({ message: "O'chirildi" })
}
