const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require('cors');
app.use(cors());
const PORT = 5000
const dbcat = require("./Category")
const dbprod = require("./Product")

app.use(express.json())

app.post('/category/add', dbcat.createCategory)
app.get('/category/all', dbcat.getCategorys)
app.put("/category/:id", dbcat.updateCategory)
app.delete("/category/:id", dbcat.deleteCategory)

app.post('/product/add', dbprod.createProduct)
app.get('/product/all', dbprod.getproduct)
app.put("/product/:id", dbprod.updateproduct)
app.delete("/product/:id", dbprod.deleteproduct)


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))


