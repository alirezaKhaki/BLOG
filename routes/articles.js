const express = require('express');
const users = require('../model/user');
const articles = require('../model/article')
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');
const JoiSchema = require('../tools/joiValidator')
const fs = require('fs')
const path = require('path')


router.get('/getAll', (req, res) => {
    articles.find({}).populate('owner', 'username').sort({ createdAt: -1 }).exec((err, article) => {
        if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message })
        if (article) return res.send(article)

    })
})

router.get('/:id', (req, res) => {
    console.log('hi');
    articles.findOne({ _id: req.params.id }).populate('owner', 'username').exec((err, article) => {
        if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message })
        if (article) return res.render('article', { article })

    })
})









module.exports = router;