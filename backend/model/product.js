var mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({
    productName:{type:String},
    productDescription:{type:String},
    imgUrl:{type:String},
},{timestamps:true});


const Product = mongoose.model('Product', productSchema);

module.exports = Product 
