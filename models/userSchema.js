import mongoose from 'mongoose';

c

const userSchema = new mongoose.Schema({
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
    resetLink: {                            //resetLink will trigger only on forgot password request is processed.
        dataType: String,
        default: ''
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema, "users")