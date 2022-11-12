const router = require('express').Router();
//Functions being called from controllers folder for user actions 
const {
    findUsers,
    oneUser,
    newUser,
    changeUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/users')
//opening route
router.route('/').get(findUsers).post(newUser);
//Routes with specifc ID
router.route('/:userId')
.get(oneUser)
.put(changeUser)
.delete(removeUser);
//Friend routes
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router