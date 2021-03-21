const express = require('express');
const register = require('./register');
const login = require('./login');
const dashbord = require('./dashboard');
const router = express.Router();
const joiSchema = require('../tools/joiValidator')
const users = require('../model/user')

/* GET home page. */
router.use('/', login);
router.use('/login', login);
router.use('/register', register);
router.use('/dashboard', dashbord);


// CREAT ADMIN  
router.post('/createadmin', async(req, res) => {
    try {
        const isAdmin = await users.findOne({ role: 'admin' })
        if (isAdmin) return res.status(400).send('bad request :(')
        let validate = await joiSchema.validateAsync(req.body);
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