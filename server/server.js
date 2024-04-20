const express = require('express');
const app = express();
const port = 5000;

const db = require('./utils/database.js');

app.get('/', (req, res) => {
    res.send(`Why are you here at port ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
