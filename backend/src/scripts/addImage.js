const db = require('../config/db')

;(async () => {
	await db.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS rasm TEXT')
	console.log("Tayyor: rasm ustuni qo'shildi")
	await db.end()
})().catch(e => {
	console.error(e)
	process.exit(1)
})
