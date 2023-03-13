require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const router = require('./router/index')
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();


const PORT = process.env.PORT
const EXT_PORT = process.env.EXT_PORT

app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

app.use(router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT || EXT_PORT, console.log(`Server started`));
    } catch (err) {
        console.log(err);
    }
}

start();