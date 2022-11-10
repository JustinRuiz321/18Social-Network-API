const router = require('express').Router();
const thoughts = require('./thoughts.js');
const users = require('./users.js');

router.use('/thoughts', thoughts);
router.use('/users', users);

module.exports = router;