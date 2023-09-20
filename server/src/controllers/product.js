const Product = require('../models/product')

const path = require('path')
const fs = require('fs')
const addNewProduct = async (req, res) => {
  req.body.productImage = req.file?.filename
  await Product.create(req.body)
    }

  const getAllProducts = async (req, res) => {
    const data = await Product.find()
    res.json({productList: data})
      }

      const getProductImage = async (req, res) => {   
        try{
          const productInfo = await Product.findById(req.params.id)
          const imagePath = path.join(__dirname, '../../uploads/products', productInfo.productImage )
          const defaultimagePath = path.join(__dirname, '../../uploads/avatar', 'defaultImg.png' )
          
          if(fs.existsSync(imagePath)){
            res.sendFile(imagePath)
          }else{
            res.sendFile(defaultimagePath)
          }

        }catch(err){
          console.log(err)
        }
       
      
      }   

module.exports = {addNewProduct,getAllProducts,getProductImage}