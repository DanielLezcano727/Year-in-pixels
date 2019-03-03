module.exports = {
    isLoggedIn: (req,res,next) => {
        return req.isAuthenticated() ? next() : res.redirect('/');
    },
    isNotLoggedIn: (req,res,next) => {
        return req.isAuthenticated() ? res.redirect('/yearInPixels') : next();
    }
}