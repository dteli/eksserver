require('dotenv').config();

const express = require('express');

const app = express();

const userC = require('./controllers/userC');
const userprefsC = require('./controllers/userprefsC');
const xwC = require('./controllers/xwC');

let seq = require('./db');
seq.sync();

app.use(express.json());
app.use(require('./mw/headers'));

app.use('/user', userC);

app.use(require('./mw/validate'));

app.use('/xw', xwC);
app.use('/userprefs', userprefsC);


app.listen(3014,
  () => console.log('listening on 3014'));