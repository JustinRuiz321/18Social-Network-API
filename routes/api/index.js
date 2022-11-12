const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');
//Routes used for user actions and thoughts actions
router.use('/users', userRoutes)

router.use('/thoughts', thoughtRoutes)

module.exports = router;