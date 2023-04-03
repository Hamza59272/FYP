var express = require ('express')
const router = express.Router()
var {
  authUser,
  TestingPage,
  registerUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController.js')

var { protect, admin } = require('../middleware/authMiddleware.js')

require('dotenv').config();
const {SECRET_KEY} = process.env

router.route('/').get(TestingPage)
router.route('/signup').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)


module.exports = router
