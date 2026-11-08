const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/products', productRoutes)

// Xatolarni ushlash
app.use((err, req, res, next) => {
	console.error(err)
	res.status(500).json({ message: 'Server xatosi' })
})

module.exports = app
