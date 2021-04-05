const express = require('express');
const comments = require('../model/comment');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const JoiSchema = require('../tools/joiValidator')



router.get('/allComments', generalTools.loginChecker, (req, res) => {
    if (req.session.user.role !== 'admin') return res.status(403).send('access denied!')
    comments.find().populate('owner').populate('article').exec((err, comment) => {
        if (err) return res.status(500).send('server error')
        if (comment) return res.send(comment)
    })
})


router.get('/articleComment/:id', (req, res) => {
    comments.find({ article: req.params.id }).populate('owner').sort({ createdAt: -1 }).exec((err, comment) => {
        if (err) return res.status(500).send('server error')
        if (comment) return res.send(comment)
    })
})


router.post('/newComment/:id', async(req, res) => {
    try {
        if (!req.session.user) return res.status(400).send('login first')
        if (req.body.text === "") return res.status(400).send('text input is empty')
        let comment = new comments({
            text: req.body.text,
            owner: req.session.user._id,
            article: req.params.id
        })
        comment = await comment.save();
        if (comment) return res.send('comment saved')

    } catch (err) {
        if (err) return res.status(500).send(err.message);
    }
})


module.exports = router