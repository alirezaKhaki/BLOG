const express = require('express');
const register = require('./register');
const login = require('./login');
const articles = require('./articles');
const dashbord = require('./dashboard');
const comments = require('./comment');
const router = express.Router();
const joiSchema = require('../tools/joiValidator')
const users = require('../model/user')
const chatRoom = require('./chatroom')
const Joi = require("joi")


/*  ALL THE MAIN ROUTES */
router.use('/login', login);
router.use('/register', register);
router.use('/dashboard', dashbord);
router.use('/articles', articles);
router.use('/comments', comments);
router.use('/chatRoom', chatRoom);

//landing page routes
router.get('/', (req, res) => {
    res.render('landingPage', { session: req.session.user })
})
router.get('/download', (req, res) => {
    const file = `${__dirname}/../public/files/AlirezaMansourKhaki-resume.pdf`;
    res.download(file); // Set disposition and send it.
})




// CREAT ADMIN  
router.post('/createadmin', async(req, res) => {
    try {
        const isAdmin = await users.findOne({ role: 'admin' })
        if (isAdmin) return res.status(400).send('bad request :(')
        let validate = await joiSchema.dashboard.validateAsync(req.body)
        const checkUser = await users.findOne({ username: req.body.username });
        if (checkUser) return res.status(400).send('user already exist!')
        if (validate) {
            let admin = new users(req.body)
            admin.role = 'admin'
            admin = await admin.save()
            if (admin) return res.send('admin created')

        }

    } catch (err) {
        if (err.stack.includes('ValidationError')) return res.status(400).send(err.details[0].message);
        if (err) return res.status(500).send(err);
    }
})


module.exports = router;