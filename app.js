const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
// const db = require('./config/db');
const express = require('express');
const routes = require('./routes');
const socketIO = require('socket.io');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const auth = require('./middleware/Auth');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// const Donations = require('./models/Donations');
// const expressValidator = require('express-validator');

// Config. de servidor -----------------------------------|
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

// Modelos -----------------------------------------------|

module.exports = {
	config: path.resolve('./src/database/config', 'config.js'),
	'models-path': path.resolve('./src/database/models'),
	'seeders-path': path.resolve('./src/database/seeders'),
	'migrations-path': path.resolve('./src/database/migrations'),
};
// Servidor Express --------------------------------------|
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Motor de Vistas
/*app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));*/
app.set('view engine','pug');

// Rutas estáticas.
app.use(express.static('public'));
app.use(express.static('uploads'));
app.set('views', path.join(__dirname,'./views'));

// Sesiones
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

// Flash messages
app.use(flash());
app.use((req,res,next) => {
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;
    console.log(res.locals.usuario);
    next();
});

// Cookies
app.use(cookieParser());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/', routes());

// Arranque del servidor
const server = app.listen(port,host,() => {
    console.log('Servido iniciado.');
});

// Sockets se necesita mover de aquí
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