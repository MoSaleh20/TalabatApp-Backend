const express = require('express')
const { db } = require('../models/menu.model')
const router = express.Router()
const Menu = require('../models/menu.model')
const adminAuth = require('../middleware/adminAuth')


router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find()
        res.json(menus)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        // const menu = await Menu.findById(req.params.id)
        const menu = await Menu.find({ rest_id: req.params.id });
        res.json(menu)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/',adminAuth, async (req, res) => {
    const menu = new Menu({
        rest_id: req.body.rest_id,
        name: req.body.name,
        descr: req.body.descr,
        price: req.body.price,
        image: req.body.image
    })

    try {
        const a1 = await menu.save()
        res.json(a1)
    } catch (err) {
        res.send('Error' + err)
    }
})


router.put('/:id',adminAuth, async (req, res) => {

    try {
        await Menu.findByIdAndUpdate(req.params.id, {
            "name": req.body.name,
            "rest_id": req.body.rest_id,
            "descr": req.body.descr,
            "price": req.body.price,
            "image": req.body.image
        });
        res.json({"done":"true"})
    } catch (err) {
        res.send('Error' + err)
    }
})

router.delete('/:id',adminAuth, async (req, res) => {
    try {
        var menu = await Menu.findByIdAndRemove(req.params.id);
        menu = req.body;
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router