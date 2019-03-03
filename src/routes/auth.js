const express = require('express');
let router = express.Router();

const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/days',
    failureRedirect: '/'
}));

router.post('/login',isNotLoggedIn, passport.authenticate('local.login',{
    successRedirect: '/days',
    failureRedirect: '/'
}));

module.exports = router;