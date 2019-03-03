const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const mysqlsession = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');

//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')
}));
app.set('view engine', 'hbs');

//Middlewares
app.use(morgan('dev'));
app.use(session({
    secret: 'Session Year In Pixels',
    resave: false,
    saveUninitialized: false,
    store: new mysqlsession(database)
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req,res,next) => {
    app.locals.user = req.user;
    next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));

//Public
app.use(express.static(path.join(__dirname, 'public')));   //Donde van a estar las paginas publicas (CSS,JS,HTML)

//Starting the server
app.listen(app.get('port'), (req,res) => {
    console.log(`Server listening at port ${app.get('port')}`);
});