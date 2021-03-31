const express = require('express');
const users = require('../model/user');
const articles = require('../model/article')
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');
const JoiSchema = require('../tools/joiValidator')
const fs = require('fs')
const path = require('path');
const { log } = require('console');

// ALL ARTICLES
router.get('/getAll', (req, res) => {
        articles.find({}).populate('owner', 'username').sort({ createdAt: -1 }).exec((err, article) => {
            if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message })
            if (article) return res.send(article)

        })
    })
    // DETAILS OF ONE ARTICLE

router.get('/:id', (req, res) => {
    articles.findOne({ _id: req.params.id }).populate('owner', 'username').exec((err, article) => {
        if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message })
        if (article) return res.render('article', { article })

    })
})


// ADD NEW ARTICLE
router.post('/newArticle', generalTools.loginChecker, async(req, res) => {
    // if (!req.body.title || !req.body.text) return res.status(400).send('article must have title and text');
    // if (!req.body.owner) return res.status(400).send('article must have an owner');
    const upload = generalTools.uploadArticle.single('avatar');

    upload(req, res, async(err) => {
        if (err) {
            res.status(500).send("server error")
        } else {
            if (req.file == undefined) {
                try {
                    let newArticle = new articles({
                        owner: req.session.user._id,
                        text: req.body.text,
                        title: req.body.title,
                        avatar: 'ArticleDefault.jpg'
                    })
                    newArticle = await newArticle.save()
                    if (newArticle) return res.send("New Article Created")
                } catch (err) {
                    if (err.stack.includes("Path `text` is required")) return res.status(400).send('title and text is required')
                    if (err.stack.includes("minimum allowed length")) return res.status(400).send(' text is minimum allowed length(100)')
                }


            } else {

                try {
                    let newArticle = new articles({
                        owner: req.session.user._id,
                        text: req.body.text,
                        title: req.body.title,
                        avatar: req.file.filename
                    })
                    newArticle = await newArticle.save()
                    if (newArticle) return res.send("New Article Created")
                } catch (err) {
                    if (err.stack.includes("Path `text` is required")) return res.status(400).send('title and text is required')
                    if (err.stack.includes("minimum allowed length")) return res.status(400).send(' text is minimum allowed length(100)')
                }

            }
        }



    })

})

// ARTICLES OF ONE BLOGGER
router.get('/myArticles/:id', generalTools.loginChecker, async(req, res) => {
        try {
            const article = await articles.find({ owner: req.params.id }).sort({ createdAt: -1 })
            res.send({ article });

        } catch (err) {
            res.status(500).send('server error');
        }

    })
    //DELETE ARTICLE
router.get('/delete/:id', (req, res) => {
    articles.findByIdAndDelete({ _id: req.params.id }, (err) => {
        if (err) return res.status(500).send('server error')
        return res.send('this article has been deleted!')
    })
})








module.exports = router;