var express = require('express');
var router = express.Router();
const Auth = require('../middleware/auth.js');
const Product = require('../controller/product.controller.js');
const Comment = require('../controller/comment.controller.js');

router.get('/',Product.getAll);
router.post('/',Auth,Product.createProduct);
router.delete('/:id',Auth,Product.deleteProduct);

//comment
router.post('/:id/comment',Auth,Comment.create);

module.exports = router;

