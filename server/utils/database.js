const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log("Issue connecting to database: ", err);
});

// Create a schema for users
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    receiptIDs: { type: Array, default: [] },
    venmoCreds: { type: String, default: null },
    zelleCreds: { type: String, default: null },
    cashAppCreds: { type: String, default: null },
    paypalCreds: { type: String, default: null },
    applePayCreds: { type: String, default: null },
});

const receiptSchema = new mongoose.Schema({
    receiptID: String,
    items: { type: [{
        itemName: String,
        itemPrice: Number,
        usersPaying: [String]
    }], default: [] },
    users: {
        type: [{
            username: String,
            amountOwed: Number
        }]
    }
});



// Create a model for users
const User = mongoose.model('User', userSchema);

module.exports = {User};