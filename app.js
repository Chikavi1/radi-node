const express = require('express');
const db = require('./config/db');
const app = express();
const routes = require('./routes');
app.use('/',routes());


require('./models/Pets');

db.sync()
    .then(()=> {
        console.log('conectado al server');
    }).catch( error => console.log( error ));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host,() => {
    console.log('Servido iniciado.');
});