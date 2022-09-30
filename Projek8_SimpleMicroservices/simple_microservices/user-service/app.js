require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.use((req, res, next) => {
    return res.status(404).json({
        status: false,
        message: 'are you lost?',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

const { HTTP_PORT } = process.env;
app.listen(HTTP_PORT, () => console.log('listening on port', HTTP_PORT));