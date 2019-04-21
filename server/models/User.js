const keystone = require('keystone');

const { Types } = keystone.Field;

// First we gonna create our User list
const User = new keystone.List('User');

// Then we gonna add the fields
User.add({
    name: {
        type: Types.Name,
        required: true,
        index: true,
    },
    email: {
        type: Types.Email,
        initial: true,
        required: true,
        index: true,
    },
    password: {
        type: Types.Password,
        initial: true,
    },
    canAccessKeystone: {
        type: Boolean,
        initial: true,
    },
});

User.register();
