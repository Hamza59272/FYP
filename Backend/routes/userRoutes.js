var express = require ('express')
const router = express.Router()
var {
  authUser,
  getUsers,
  registerUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController.js')

var { protect, admin } = require('../middleware/authMiddleware.js')

require('dotenv').config();
const {SECRET_KEY} = process.env

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)


module.exports = router
