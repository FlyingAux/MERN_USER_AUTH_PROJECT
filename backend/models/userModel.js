const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/MERN');


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user',userSchema);