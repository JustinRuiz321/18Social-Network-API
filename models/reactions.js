const { Schema, Types, model } = require('mongoose');

const reactionsSchema = new Schema(
  {
    userName: {
        type: String,
        required: true,
      },
    reactions_ID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactions_body: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdWhen: {
      type: String,
      default: new Date(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//Initialize Reactions model
const Reactions = model('reactions', reactionsSchema);

module.exports = Reactions;