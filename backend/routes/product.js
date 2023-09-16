var express = require('express');
var router = express.Router();
const Auth = require('../middleware/auth.js');
const Product = require('../controller/product.controller.js');
const Comment = require('../controller/comment.controller.js');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+'-'+file.fieldname + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });

const cpUpload = upload.single('productImage');

router.get('/',Product.getAll);
router.post('/',[Auth,cpUpload],Product.createProduct);
router.delete('/:id',Auth,Product.deleteProduct);

//comment
router.post('/:id/comment',Auth,Comment.create);

module.exports = router;

