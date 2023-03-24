var express = require('express');
var passport = require('passport')
var router = express.Router();

router.get('/login', function (req, res, next) {
    res.render('login');
});
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
module.exports = router;