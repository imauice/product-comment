var express = require('express');
var router = express.Router();
var User = require('../controller/user.controller');
var Profile = require('../controller/user.profile.controller');
const Auth = require('../middleware/auth.js');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatar');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix+'-'+file.fieldname + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage });

const cpUpload = upload.single('avatar');

//get auth state
router.get('/me',Auth,User.me);

/* GET users listing. */
router.get('/profile',Auth, Profile.getProfile);

router.post('/signin', User.signin);
router.post('/signup', User.signup);

//profile
router.get('/profile', Auth, Profile.getProfile);
router.post('/profile', [Auth, cpUpload], Profile.createProfile);

module.exports = router;
