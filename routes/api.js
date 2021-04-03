const express = require('express');
const register = require('./register');
const login = require('./login');
const articles = require('./articles');
const dashbord = require('./dashboard');
const router = express.Router();
const joiSchema = require('../tools/joiValidator')
const users = require('../model/user')
const Joi = require("joi")
    /* GET home page. */
router.use('/login', login);
router.use('/register', register);
router.use('/dashboard', dashbord);
router.use('/articles', articles);
router.get('/', (req, res) => {
    res.render('home.ejs')
});


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