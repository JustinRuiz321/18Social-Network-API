const { Schema, model } = require('mongoose');
const Reactions = require('./reactions');

const thoughtsSchema = new Schema(
  {
    thoughts: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 250,
    },
    userName: {
      type: String,
      required: true
    },
    createdWhen: {
        type: String,
        default: new Date(),
      },
    reactions: [Reactions],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtsSchema
  .virtual('reactionCount')
  .get(() => {
    return this.reactions.length;
  });

//Initialize Thoughts Model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;