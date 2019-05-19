const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0,
        required: false
    }
});

// Export model
module.exports = User = mongoose.model('users', UserSchema);