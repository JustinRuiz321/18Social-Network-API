const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validate, "Enter a valid email"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Enter a valid email",
            ],
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false,
    }
);
const validate = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

usersSchema
    .virtual('Connected friends :)')
    .get(function () {
        return this.friends.length;
    });

// Initialize our User model
const User = model('user', usersSchema);


module.exports = User;