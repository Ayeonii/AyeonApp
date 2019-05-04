const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('../../../middlewares/auth')

router.post('/signup',controller.signup)
router.post('/signin', controller.signin)

router.use('/check', authMiddleware)
router.get('/check', controller.check)


module.exports = router