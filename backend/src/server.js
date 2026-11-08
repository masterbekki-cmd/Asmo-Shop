require('dotenv').config()
const app = require('./app')
const DB_HOST = process.env.DB_HOST
const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () =>
	console.log(`Server http://${DB_HOST}:${PORT} portda ishga tushdi`),
)
