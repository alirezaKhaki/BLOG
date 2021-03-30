const express = require('express');
const users = require('../model/user');
const articles = require('../model/article')
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');
const JoiSchema = require('../tools/joiValidator')
const fs = require('fs')
const path = require('path')

// ALL ARTICLES
router.get('/getAll', (req, res) => {
        articles.find({}).populate('owner', 'username').sort({ createdAt: -1 }).exec((err, article) => {
            if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message })
            if (article) return res.send(article)

        })
    })
    // DETAILS OF ONE ARTICLE

router.get('/:id', (req, res) => {
    console.log('hi');
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
        console.log(req.body);
        if (err) {
            res.status(500).send("server error")
        } else {
            if (req.file == undefined) {
                try {
                    let newArticle = new aritcels({
                        owner: req.session.user._id,
                        text: req.body.text,
                        title: req.body.title,
                        avatar: 'ArticleDefault.jpg'
                    })
                    newArticle = await newArticle.save()
                    if (newArticle) return res.send("New Article Created")
                } catch (err) {
                    return res.status(400).send('title and text are necessary')
                }


            } else {

                try {
                    let newArticle = new aritcels({
                        owner: req.session.user._id,
                        text: req.body.text,
                        title: req.body.title,
                        avatar: req.file.filename
                    })
                    newArticle = await newArticle.save()
                    if (newArticle) return res.send("New Article Created")
                } catch (err) {
                    return res.status(400).send('title and text are necessary')
                }

            }
        }



    })

})

// ARTICLES OF ONE BLOGGER
router.get('/myArticles/:id', generalTools.loginChecker, async(req, res) => {
    console.log(req.params.id);
    try {
        const articles = await aritcels.find({ owner: req.params.id })
        res.send({ articles });

    } catch (err) {
        res.status(500).send(err);
    }

})









module.exports = router;