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
                emailTest,
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

const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validate = (email) => {
    return emailTest.test(email);
};

usersSchema
    .virtual('Connected friends :)')
    .get(function () {
        return this.friends.length;
    });

// Initialize our Users model
const Users = model('users', usersSchema);


module.exports = Users;