const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

const productRoutes = require('./src/products/product.route')
app.use('/api/products', productRoutes)

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.get('/', (req, res) => {
    res.send('Testing')
})
}

main().then(() => console.log("Mongo connected!")).catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Port ${port}`)
})