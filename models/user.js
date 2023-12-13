const mongoose = require('mongoose');

const User = mongoose.model('User', {
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    age: {
        type: Number
    }
})

module.exports = User;