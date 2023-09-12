const Product = require('../models/product')


const addNewProduct = async (req, res) => {
  await Product.create(req.body)
    }

  const getAllProducts = async (req, res) => {
    const data = await Product.find()
    res.json({productList: data})
      }

module.exports = {addNewProduct,getAllProducts}