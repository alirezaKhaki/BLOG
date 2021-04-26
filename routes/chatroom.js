const express = require('express')
const router = express.Router()
const io = require('socket.io')();
const generalTools = require('../tools/general-tools');


router.get('/', generalTools.loginChecker, (req, res) => {
    res.render('chatRoom', { session: req.session.user })
})





module.exports = router;