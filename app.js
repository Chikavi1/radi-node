const express = require('express');
const db = require('./config/db');
const routes = require('./routes');
var bodyParser = require('body-parser')



require('./models/Pets');
require('./models/Donations');

db.sync()
.then(()=> {
    console.log('conectado al server');
}).catch( error => console.log( error ));


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',routes());
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host,() => {
    console.log('Servido iniciado.');
});