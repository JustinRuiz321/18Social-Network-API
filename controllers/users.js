// const Users = require('../models/users.js');
// const Thoughts = require('../models/thoughts.js');

const {Users , Thoughts} = require('../models');

module.exports = {
    newUser(req, res) {
        Users.create(req.body)
        .then((dbUsersData) => res.json(dbUsersData))
        .catch((err) => res.status(500).json(err));
    },

    findUsers(req, res) {
        Users.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    oneUser(req, res) {
        Users.findOne({ _id: req.params.usersId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((users) =>
            !users
            ? res.status(404).json({ message: 'No user found' })
            : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.usersId })
        .then((users) =>
            !users
            ? res.status(404).json({ message: 'No found' })
            : Thoughts.deleteMany({ _id: { $in: users.thoughts } })
        )
        .then(() => res.json({ message: 'User deleted' }))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((users) =>
            !users
            ? res.status(404).json({ message: 'No user found' })
            : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },

    addFriends(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.usersId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((users) =>
            !users
            ? res.status(404).json({ message: 'Friend not found' })
            : res.json(users)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteFriends(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.usersId },
            { $pull: { friends: req.params.friendId }  },
            { runValidators: true, new: true }
        )
        .then((users) =>
            !users
            ? res.status(404).json({ message: 'Friend not found' })
            : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
};