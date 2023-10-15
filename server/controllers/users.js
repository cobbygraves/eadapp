const { UserModel } = require('../models/users.js')
const bcrypt = require('bcryptjs')
const {
  signJWTAccessToken,
  verifyJWTAccessToken
} = require('../utils/apiAuthorization.js')
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')

function compareBcryptAsync(param1, param2) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

const login = async (req, res) => {
  const user = req.body

  const userData = await UserModel.findOne({ email: user.username })

  if (
    userData &&
    (await compareBcryptAsync(user.password, userData.password))
  ) {
    const { password, ...userInfo } = userData
    const accessToken = signJWTAccessToken(userInfo)
    const { password: pwd, ...userDetails } = userInfo._doc
    return res.json({
      ...userDetails,
      accessToken
    })
  } else {
    return res.json(null)
  }
}

const signup = async (req, res) => {
  const user = req.body
  const userData = await UserModel.findOne({ email: user.username })
  if (!userData) {
    const newUser = new UserModel({
      id: uuidv4(),
      email: user.username,
      password: await bcrypt.hash(user.password, 10)
    })
    const resp = await newUser.save()

    return res.json({ id: resp.id, email: resp.email })
  } else {
    return res.status(401).json({ error: 'User Already Exist, Please Login' })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  const userData = await UserModel.findOne({ email })
  if (userData) {
    const { password } = userData
    const accessToken = signJWTAccessToken({ id: userData.id })
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rmeocnis@gmail.com',
        pass: 'sbls ziqy gooi kzzo'
      }
    })

    var mailOptions = {
      from: 'rmeocnis@gmail.com',
      to: email,
      subject: 'RESET PASSWORD LINK',
      text: `http://localhost:3000/resetPassword/${accessToken}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
    res.status(200).send(password)
  } else {
    return res.send({ status: 'user not existed' })
  }
}

const resetPassword = async (req, res) => {
  const { newPassword, accessToken } = req.body

  const decodedToken = verifyJWTAccessToken(accessToken)

  const responseData = await UserModel.findOneAndUpdate(
    { id: decodedToken.id },
    {
      password: await bcrypt.hash(newPassword, 10)
    },
    {
      new: true
    }
  )
  res.status(200).json(responseData)
}

module.exports = {
  login,
  signup,
  forgotPassword,
  resetPassword
}
