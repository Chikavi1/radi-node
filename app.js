const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/',routes());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host,() => {
    console.log('Servido iniciado.');
});