const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: value => bcrypt.hashSync(value, 10),
    },
}, {
    timestamps: { created_At: 'created_at', updated_At: 'updated_at' },
    toJSON: {
        getters: true,
        setters: true
    },
    toObject: {
        getters: true,
        setters: true
    }
});

const user = mongoose.model('users', userSchema);
module.exports = user