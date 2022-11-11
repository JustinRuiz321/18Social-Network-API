const Users = require('../models/users.js');
const Thoughts = require('../models/thoughts.js');

// const {Users , Thoughts} = require('../models');

module.exports = {
    newUser(req, res) {
        Users.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    findUsers(req, res) {
        Users.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    oneUser(req, res) {
        Users.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.usersId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No found' })
            : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
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
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    addFriends(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Friend not found' })
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteFriends(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }  },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Friend not found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};