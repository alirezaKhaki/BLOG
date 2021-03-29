const express = require('express');
const users = require('../model/user');
const articles = require('../model/article')
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');
const JoiSchema = require('../tools/joiValidator')
const fs = require('fs')
const path = require('path')


router.get('/', (req, res) => {
    articles.find({}).populate('owner', 'username').exec((err, article) => {
        if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message })
        res.send(article)

    })
})









module.exports = router;