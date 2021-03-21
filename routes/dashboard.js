const express = require('express');
const users = require('../model/user');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');

router.get('/', generalTools.loginChecker, (req, res) => {
    const user = req.session.user
    res.render('dashboard', { user })
});

router.get('/logout', (req, res) => {
    res.clearCookie("user_sid");
    res.redirect('/api/dashboard')

})

router.post('/edit', generalTools.loginChecker, (req, res) => {
    users.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, user) => {
        if (err) return res.status(500).send({ "msg": "server error " })
        res.clearCookie("user_sid");
        if (user) return res.send({ "msg": "sucsses" });
    })
})

router.post('/password', generalTools.loginChecker, (req, res) => {
    if (!req.body.password) return res.status(400).send('old password input is empty')
    if (!req.body.new_password) return res.status(400).send('new password input is empty')

    users.findOne({ _id: req.body._id }, function(err, user) {
        if (err) return res.status(500).send({ "msg": "server error " })
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, respoonse) {
                if (err) return res.status(500).send({ "msg": "server error " })
                if (respoonse) {
                    users.findOneAndUpdate({ _id: req.body._id }, { password: req.body.new_password }, { new: true }, function(err, user) {
                        if (err) return res.status(500).send({ "msg": "server error " })
                        res.clearCookie("user_sid");
                        if (user) res.send({ "msg": "sucsses" })
                    });
                } else {

                    return res.status(401).send('wrong password');
                }
                if (!user) return re.status(404).send("user not found")
            });
        }
    })
})


router.post('/delete', generalTools.loginChecker, (req, res) => {

    const pass = req.session.user.password
    const id = req.session.user._id
    if (!req.body.password) return res.status(400).send('password input is empty')
    bcrypt.compare(req.body.password, pass, function(err, respoonse) {
        if (err) res.status(500).send('server error');
        if (respoonse) {
            users.remove({ _id: id }, function(err) {
                if (err) return res.status(500).send("server error :(")
                res.clearCookie("user_sid");
                res.send("deleted")
            })
        } else {
            res.status(401).send("wrong password")
        }
    });
})

module.exports = router;