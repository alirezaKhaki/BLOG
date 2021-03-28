const express = require('express');
const users = require('../model/user');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');
const JoiSchema = require('../tools/joiValidator')
const fs = require('fs')
const path = require('path')
const multer = require('multer');

router.get('/', generalTools.loginChecker, (req, res) => {
    const user = req.session.user
    console.log(user);
    res.render('dashboard', { user })
});

router.get('/logout', (req, res) => {
    res.clearCookie("user_sid");
    res.redirect('/api/dashboard')

})

router.post('/edit', generalTools.loginChecker, async(req, res) => {

    if (req.body.role == 'admin') return res.status(400).send('bad request :(')
    try {
        if (req.session.user.username === req.body.username) {
            console.log(true);
            let validate = await JoiSchema.dashboard.validateAsync(req.body);
            if (validate) {
                console.log(true);
                const Updated = await users.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }).exec();
                res.clearCookie("user_sid");
                return res.send({ "msg": "success" })
            }
        }
        let validate = await JoiSchema.dashboard.validateAsync(req.body);
        const checkUser = await users.findOne({ username: req.body.username });
        if (checkUser) return res.status(400).send('user already exist!')
        if (validate) {
            saveUser = await users.findOneAndUpdate({ username: req.session.user.username }, req.body, { new: true })
            res.clearCookie("user_sid");
            return res.send({ "msg": "success" })
        }

    } catch (err) {
        if (err.stack.includes('ValidationError')) return res.status(400).send(err.details[0].message);
        if (err) return res.status(500).send(err);
    }



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


router.post('/delete', generalTools.loginChecker, async(req, res) => {

    const pass = req.session.user.password
    const id = req.session.user._id
    console.log(req.body.username);


    if (!req.body.password) return res.status(400).send('password input is empty')
    users.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).send('server error')
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, data) => {
                if (err) return res.status(500).send('server error :(')
                if (data) {
                    users.remove({ _id: user._id }, (err) => {
                        if (err) return res.status(500).send('server error :((')
                        res.clearCookie("user_sid");
                        res.send('deleted')
                    })
                } else if (!data) return res.status(400).send('wrong password')

            })
        } else if (!user) return res.status(400).send('user not found')
    })

})

//**UPLOAD AVATAR**/
router.post('/avatar', generalTools.loginChecker, (req, res) => {
    console.log('hi');
    const upload = generalTools.uploadAvatar.single('avatar');

    upload(req, res, (err) => {
        if (err) {
            res.status(500).send("server error")
        } else {
            if (req.file == undefined) {

                res.status(400).send('No File Selected!')

            } else {

                users.findByIdAndUpdate(req.session.user._id, { avatar: req.file.filename }, { new: true }, (err, user) => {
                    if (err) return res.status(500).json({ msg: 'Server Error!' })
                    if (user) {
                        req.session.user = user
                        res.send('/api/dashboard')
                    }
                });

            }
        }



    })
})



//DELETE AVATAR 
router.delete('/deleteAvatar', generalTools.loginChecker, (req, res) => {
    if (req.session.user.avatar == 'default.png') return res.status(400).send("You Don't Have An Avatar")
    users.findOneAndUpdate({ _id: req.session.user._id }, { avatar: 'default.png' }, { new: true }, (err, data) => {
        if (err) return res.status(500).send('server error')
        req.session.user = data
        if (data) return res.send('Avatar deleted')
    })
})

module.exports = router;