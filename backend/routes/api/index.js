const router =require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth/authenticate')
const admin = require('./admin/administer')

router.use('/auth', auth)
router.use('/admin', authMiddleware)
router.use('/admin', admin)

module.exports = router;

