const express = require('express');
const routes  = require('./routes');
const path    = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');
const exphbs = require('express-handlebars');
// const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

const socketIO = require('socket.io');
const Donations = require('./models/Donations');


require('./models/Pets');
require('./models/Donations');

db.sync()
.then(()=> {
    console.log('conectado al server');
}).catch( error => console.log( error ));


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// cargar archivos estaticos

// habilitar pug
app.engine('handlebars',
exphbs({
    defaultLayout: 'layout'
})
);

app.set('view engine','handlebars');
app.use(express.static('public'));

//añadir carperta vista
app.set('views', path.join(__dirname,'./views'));

//agregar flash messages
app.use(flash());

app.use(cookieParser());
//sessiones  nos permite navegar entre distintas paginas sin volvernos autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;
    console.log(res.locals.usuario);
    next();
});




app.use('/',routes());
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const server = app.listen(port,host,() => {
    console.log('Servido iniciado.');
});
const io = socketIO(server);

io.on('connection',(socket) => {
    console.log('new connection',socket.id);



    socket.on('chat:message', async(data) => {

        const { headline,amount,message } = data;

        const donation =  await Donations.create({
            headline,amount,message
        });

        

        io.sockets.emit('chat:message',{
            headline,amount,message
        });
    });

});