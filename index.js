
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000;
const host = "localhost";
const db = require('./db');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, host, () => console.log(`Server running on port ${apiPort}`))