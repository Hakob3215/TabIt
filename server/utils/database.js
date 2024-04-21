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
    pfp: { type: String, default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" },
    friends: { type: Array, default: [] },
    receiptIDs: { type: Array, default: [] },
    venmoCreds: { type: String, default: null },
    zelleCreds: { type: String, default: null },
    cashAppCreds: { type: String, default: null },
    paypalCreds: { type: String, default: null },
    applePayCreds: { type: String, default: null },
});

const receiptSchema = new mongoose.Schema({
    title: String,
    owner: String,
    items: { type: [{
        itemName: String,
        itemPrice: Number,
        usersPaying: [String]
    }], default: [] },
    users: {
        type: [{
            username: String,
            venmoCreds: String,
            amountOwed: Number
        }]
    },
    tax: {type: Number,
        default: null},
    tip: {type:Number,
        default: null},
    total: {type: Number,
        default: null}
});



// Create a model for users
const User = mongoose.model('User', userSchema);
// Create a model for receipts
const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = {User, Receipt};