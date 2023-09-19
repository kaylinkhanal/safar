const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:  String,
    productPrice: String,
    productImage: String,
    productCategory: String,
    productDescription: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product