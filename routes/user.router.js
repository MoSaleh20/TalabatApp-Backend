
const express = require('express')
const { db } = require('../models/menu.model')
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const adminAuth = require('../middleware/adminAuth')

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const a1 = await user.save()
        res.json(a1)
    } catch (err) {
        res.send('Error' + err)
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        var user = await User.findByIdAndRemove(req.params.id);
        // user = req.body;
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

router.post('/login', (req, res) => {
    try {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err;
            if (!user || !user.comparePassword(req.body.password)) {
                res.json({ message: 'Authentication failed. Invalid user or password.'});
            }
            else {
                let token = jwt.sign({ username: user.username, _id: user.id }, 'mykey');
                res.header("x-auth-token", token).send({
                    _id: user.id,
                    username: user.username,
                    token: token,
                    isAdmin: user.isAdmin
                });
            }
                
        });
    } catch(err) {
        res.send('Error ' + err);
    }  
})

router.post('/register', async(req, res) => {
    const user = User({
        username: req.body.username,
        last_name: req.body.last_name,
        phone: req.body.phone,
        password: req.body.password
    });

    try {
        const a1 = await user.save()
        res.json(a1)
    } catch (err) {
        res.send('Error ' + err)
    }
})


module.exports = router;