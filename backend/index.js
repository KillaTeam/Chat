require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const router = require('./router/index')

const app = express();
const PORT = process.env.PORT || process.env.EXT_PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, console.log(`Server started on ${PORT} port`));
    } catch (err) {
        console.log(err);
    }
}

start();