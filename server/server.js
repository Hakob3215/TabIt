const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 5000;

const db = require('./utils/database.js');
const UserModel = db.User;
const ReceiptModel = db.Receipt;



app.post('/api/user/signup', (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    // Check if username is taken
    UserModel.findOne({ username: username }).then((user) => {
        if (user){
            res.status(201).send(null);
            return;
        }
        // Check if email is taken
        UserModel.findOne({ email: email }).then((user) => {
        if (user){
            res.status(202).send(null);
            return;
        }
        // Create new user
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            username,
            password,
        });
        newUser.save().then(() => {
            res.status(200).send(null);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(null);
        });
    });
    });
    
});

app.post('/api/user/login', (req, res) => {
    const { userOrEmail, password } = req.body;
    UserModel.findOne({ $or: [{ username: userOrEmail }, { email: userOrEmail }] }).then((user) => {
        if (!user || user.password !== password) {
            res.status(201).send(null);
        } else {
            res.status(200).send(user.username);
        }
    }).catch((error) => {
        res.status(400).send(null);
    });
});

app.post('/api/user/profile', (req, res) => {
    const { username } = req.body;
    UserModel.findOne({ username: username }).then((user) => {
        res.status(200).send(user);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});

app.post('/api/user/update-venmo', (req, res) => {
    const { username, venmoCreds } = req.body;
    UserModel.findOneAndUpdate({ username: username }, { venmoCreds: venmoCreds }).then(() => {
        res.status(200).send(null);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});

app.get('/api/user/all', (req, res) => {
    UserModel.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});

app.post('/api/user/friends', (req, res) => {
    const { username } = req.body;
    UserModel.findOne({ username: username }).then((user) => {
        UserModel.find({ username: { $in: user.friends } }).then((friends) => {
            res.status(200).send(friends);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(null);
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});

app.post('/api/receipts/new-receipt', (req, res) => {
    const { receipt } = req.body;
    const newReceipt = new ReceiptModel(receipt);
    newReceipt.save().then(() => {
        // add receipt id to user
        UserModel.findOne({ username: receipt.owner }).then((user) => {
            user.receiptIDs.push(newReceipt._id);
            user.save().then(() => {
                // send success status
                res.status(200).send(newReceipt._id);
            }).catch((error) => {
                console.log(error);
            });
        });
    }).catch((error) => {
        console.log(error);
    });
});

app.post('/api/receipts/update-receipt', (req, res) => {
    const { receipt } = req.body;
    // get the correct id from latest user receipt
    UserModel.findOne({ username: receipt.owner }).then((user) => {
        const receiptID = user.receiptIDs[user.receiptIDs.length - 1];
        ReceiptModel.findByIdAndUpdate(receiptID, receipt).then(() => {
            res.status(200).send(receiptID);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(null);
        });
    });
});

app.post('/api/receipts/add-price-data', (req, res) => {
    let { receiptID, items, users } = req.body;
    // remove quotes from receiptID
    receiptID = receiptID.substring(1, receiptID.length - 1);
    ReceiptModel.findByIdAndUpdate(receiptID, { items, users }).then(() => {
        res.status(200).send(receiptID);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});

app.post('/api/receipts/get-receipts', (req, res) => {
    const { username } = req.body;
    UserModel.findOne({ username: username }).then((user) => {
        if (!user) {
            res.status(400).send(null);
            return;
        }
        const receiptIDs = user.receiptIDs;
        ReceiptModel.find({ _id: { $in: receiptIDs } }).then((receipts) => {
            res.status(200).send({ receipts });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(null);
        });
    });
});

app.post('/api/receipts/retrieve-receipt', (req, res) => {
    let { receiptID } = req.body;
    // remove quotes from receiptID
    receiptID = receiptID.substring(1, receiptID.length - 1);

    ReceiptModel.findOne({ _id: receiptID }).then((receipt) => {
        res.status(200).send(receipt);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});

app.post('/api/user/addFriend', (req, res) => {
    const { username, friend } = req.body;

    // Fetch the user and the friend from the database
    UserModel.findOne({ username: username }).then((user) => {
        if (!user.friends.includes(friend)) {
            user.friends.push(friend);
            UserModel.findOneAndUpdate({ username: friend }, { $push: { friends: username } }).then(() => {
                UserModel.findOneAndUpdate({ username: username }, { friends: user.friends }).then(() => {
                    res.status(200).send(null);
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send(null);
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).send(null);
            });
        } else {
            res.status(200).send(null);
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send(null);
    });
});









app.get('/', (req, res) => {
    res.send(`Why are you here at port ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
