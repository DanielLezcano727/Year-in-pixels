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
});

router.get('/emotion', isLoggedIn, (req,res) => {
    res.render('emotion',{
        css:'css/emotion.css',
        awesomeFonts: true,
        bootstrap: true,
        emotion: [
            'feliz - alegre',
            'triste - decepcionado/a',
            'enojado/a - furioso/a',
            'productivo/a',
            'estresado/a - nervioso/a',
            'cansado/a - exhausto',
            'enfermo/a',
            'perezoso/a',
            'excitado/a - emocionado/a',
            'preocupado/a - tenso/a',
            'normal - neutro/a',
            'aburrido/a',
            'relajado/a - tranquilo/a'
        ]
    });
});

module.exports = router;