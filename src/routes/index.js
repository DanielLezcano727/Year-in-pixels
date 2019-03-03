const express = require('express');
let router = express.Router();
const {isNotLoggedIn, isLoggedIn} = require('../lib/auth');

router.get('/', isNotLoggedIn, (req,res) => {
    res.render('home', {
        nav: true,
        bootstrap: true,
        css: 'css/home.css'
    });
});

router.get('/days', isLoggedIn, (req,res) => {
    res.render('days', {css:'css/yearInPixels.css'});
    console.log(req.user);
})
module.exports = router;