const express = require('express')
const { login, signup } = require('../controllers/users')
// const upload = require('../utils/uploadImage')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)

module.exports = router
