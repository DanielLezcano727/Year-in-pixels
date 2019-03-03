const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('./helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},(username,password,done) => {
    const user = {
        username,
        password
    };
    user.password = await helpers.encryptPass(password);
    let res = await db.query('INSERT INTO users SET ?', [user]);
    user.id = res.id;
    console.log(id);
    done(null,user);
}));

passport.serializeUser((usr,done) => {
    done(null,usr.id);
});

passport.deserializeUser( async (id,done) => {
    let rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null,rows[0]);
});


passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    let rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0) {
        let usr = rows[0];
        let validator = await helpers.matchPass(password, usr.password);
        if(validator){
            done(null,usr);
        }else{
            done(null,false);
        }
    }else{
        return done(null,false);
    }
}));