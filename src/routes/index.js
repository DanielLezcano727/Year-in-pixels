const express = require('express');
let router = express.Router();

router.get('/',(req,res) => {
    res.render('home', {
        nav: true,
        bootstrap: true,
        css: 'css/home.css'
    });
});

router.get('/days', (req,res) => {
    res.send('Welcome');
})
module.exports = router;