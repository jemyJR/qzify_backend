const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: '',
    },
    role: {
        type: String,
        default: 'student',
    },
    tokenVersion: { type: Number, default: 0 },
    resetPassToken: { type: String },
    resetPassTokenExpire: { type: Date },
    isVerified: { type: Boolean },
    verificationToken: { type: String },
    verificationTokenExpire: { type: Date }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;