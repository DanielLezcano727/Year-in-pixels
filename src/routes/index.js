const express = require('express');
const db = require('../database');

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
    // console.log(req.user);
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

router.get('/save/:id/:day', isLoggedIn, async (req,res) => {
    let id = req.params.id.split('').slice(2).join('');
    let day = +req.params.day * 2;
    let rows = await db.query(`SELECT emociones FROM users WHERE id = ${req.user.id}`);
    let emociones = rows[0].emociones;

    for(let i=emociones.length;i<day+2; i+=2){
        emociones += '00';
    }

    emociones = emociones.slice(0,day) + id + emociones.slice(day+2,emociones.length);

    console.log(emociones);

    await db.query(`UPDATE users SET emociones = ${emociones} WHERE id = ${req.user.id}`);

    res.send('/days');
});

module.exports = router;