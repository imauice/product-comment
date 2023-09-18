var express = require('express');
var router = express.Router();
var User = require('../controller/user.controller');
var Profile = require('../controller/user.profile.controller');
const Auth = require('../middleware/auth.js');



//get auth state
router.get('/me',Auth,User.me);

/* GET users listing. */
router.get('/profile',Auth, Profile.getProfile);

router.post('/signin', User.signin);
router.post('/signup', User.signup);

//profile
router.get('/profile', Auth, Profile.getProfile);
router.post('/profile', Auth, Profile.createProfile);

module.exports = router;
