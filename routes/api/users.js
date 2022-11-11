const router = require('express').Router();

const {
  findUsers,
  oneUser,
  newUser,
  updateUser,
  deleteUser,
  addFriends,
  deleteFriends
} = require('../../controllers/users');


router.route('/').get(findUsers).post(newUser);

router.route('/:userId').get(oneUser).put(updateUser).delete(deleteUser);

router.route('/:userId/addfriends/:friendId').post(addFriends);

router.route('/:userId/deletefriends/:frendId').delete(deleteFriends);

module.exports = router;