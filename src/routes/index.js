const express = require('express');
let router = express.Router();

router.get('/',(req,res) => {
    res.render('home', {
        nav: true,
        bootstrap: true,
        css: 'css/home.css'
    });
});

module.exports = router;