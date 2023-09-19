const User = require('../models/user')
const express=require('express')
const router=express.Router()
const ProductController = require('../controllers/product')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/')
  },
  filename: function (req, file, cb) {
    const imageName = Math.floor(Math.random()*1000000) + file.originalname
    
    cb(null, imageName)
  }
})

const upload = multer({ storage: storage })
router.post('/products', upload.single('productImage'),ProductController.addNewProduct)


   module.exports = router