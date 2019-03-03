const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//Initializations
const app = express();

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

//Global variables

//Routes
app.use(require('./routes/index'));

//Public
app.use(express.static(path.join(__dirname, 'public')));   //Donde van a estar las paginas publicas (CSS,JS,HTML)

//Starting the server
app.listen(app.get('port'), (req,res) => {
    console.log('Server listening at port ', app.get('port'));
});