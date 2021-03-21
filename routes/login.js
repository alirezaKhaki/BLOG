const express = require('express');
const users = require('../model/user')
const url = require('url')
const router = express.Router();
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');

router.get('/', generalTools.sessionChecker, (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(400).send('please fill the inputs!')
    users.findOne({ username: req.body.username }, function(err, user) {
        if (err) return res.status(500).send({ "msg": "server error " })
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, respoonse) {
                if (err) return res.status(500).send({ "msg": "server error " })
                if (respoonse) {
                    req.session.user = user;

                    return res.send("login sucssesfull")
                } else {

                    return res.status(404).send('user not found');
                }
            });
        } else if (!user) {
            res.status(404).send('user not found');
        }
    })
})


module.exports = router;