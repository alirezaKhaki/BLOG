const express = require('express');
const users = require('../model/user')
const router = express.Router();
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');
const nodemailer = require('nodemailer');
require('dotenv').config()
const JoiSchema = require('../tools/joiValidator')


router.get('/', generalTools.sessionChecker, (req, res) => {
    res.render('login', { session: req.session.user })
})


//VALIDATE LOGIN DATA FROM CLIENT
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


//FORGOT PASSWORD FUNCTION AND RECOVERY EMAIL SEND
router.post('/forgot', async(req, res) => {
    try {
        if (req.body.username === "admin") return res.status(403).send('access denied')
        let validate = await JoiSchema.forgot.validateAsync(req.body);
        let user = await users.findOne({ username: req.body.username })
        if (!user) return res.status(404).send('user not found');
        if (user) {
            const userPassword = await users.findOneAndUpdate({ username: req.body.username }, { password: user.mobile }, { new: true })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Password Recovery',
                html: `<h1>Welcome</h1><p>your password has been changed successfully to your mobile number: ${user.mobile}</p> <br>
                <h1>PLEASE CHANGE YOUR PASSWORD IMMEDIATELY AFTER YOUR FIRST LOGIN</h1>`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return console.log('Email sent: ' + info.response);

                }
            });
            return res.status(200).send('Email have been sent to your inbox')
        }
    } catch (error) {
        if (error.stack.includes('"email" must be a valid email')) return res.status(404).send('Wrong Email Format');
        if (error) res.status(500).send('server error');

    }
})

module.exports = router;