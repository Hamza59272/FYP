var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: true,
    },
    Lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    Image: {
      type: String
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
    Subscription: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports =  User
