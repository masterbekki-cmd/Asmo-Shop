const db = require('../config/db')

;(async () => {
	await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      nomi VARCHAR(100) NOT NULL,
      materiali VARCHAR(100),
      rangi VARCHAR(50),
      razmeri VARCHAR(20),
      narxi INT NOT NULL
    )
  `)
	await db.query(
		'INSERT INTO products (nomi, materiali, rangi, razmeri, narxi) VALUES ($1, $2, $3, $4, $5)',
		['Dvoyka', 'Xebe', 'Bardoviy', '44', 350000],
	)
	console.log('Tayyor: jadval yaratildi')
	await db.end()
})().catch(e => {
	console.error(e)
	process.exit(1)
})
