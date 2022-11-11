// const Users = require('../models/users');
// const Thoughts = require('../models/thoughts');
const  {Users, Thoughts} = require('../models');

module.exports = {

    oneThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
        .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: 'No thought found' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    gatherThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Cannot find thought' })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    newThoughts(req, res) {
        Thoughts.create(req.body)
        .then((thoughts) => {
            return Users.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughts._id } },
                { new: true }
            );
        })
        .then((user) =>
            !user
            ? res.status(404).json({
                message: 'No User found',
                })
            : res.json('Thought processed')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
    },

    deleteThoughts(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: 'Cannot find thought' })
            : Users.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
                )
        )
        .then((users) =>
            !users
            ? res
            .status(404)
            .json({ message: 'No user found' })
            : res.json({ message: 'Lost thought' })
        )
        .catch((err) => res.status(500).json(err));
    }
};