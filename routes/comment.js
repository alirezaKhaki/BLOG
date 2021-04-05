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
    comments.find({ article: req.params.id }).populate('owner').exec((err, comment) => {
        if (err) return res.status(500).send('server error')
        if (comment) return res.send(comment)
    })
})


router.post('/newComment', generalTools.loginChecker, async(req, res) => {
    try {
        let validate = await JoiSchema.comment.validateAsync(req.body);
        if (validate) {
            let comment = new comments(req.body)
            comment = await comment.save();
            if (comment) return res.send('comment saved')
        }
    } catch (err) {
        if (err.stack.includes('ValidationError')) return res.status(400).send(err.details[0].message);
        if (err) return res.status(500).send(err);
    }
})


module.exports = router