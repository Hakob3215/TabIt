const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 5000;

const db = require('./utils/database.js');
const UserModel = db.User;



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
            res.status(200).send(null);
        }
    }).catch((error) => {
        res.status(400).send(null);
    });
});











app.get('/', (req, res) => {
    res.send(`Why are you here at port ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
