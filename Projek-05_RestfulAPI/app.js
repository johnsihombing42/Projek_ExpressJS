const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const controller = require('./controllers');
const router = require('./routes')

app.use(express.json());
app.use(morgan('dev'));
app.use('/public', express.static('public')); // set public directory

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.use(router)

// handle 404
app.use(controller.exception);

// handle server error
app.use(controller.notFound);

app.listen(port, () => console.log('listening on port', 3000));