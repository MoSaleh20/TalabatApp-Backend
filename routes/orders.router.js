const express = require('express')
const auth = require('../middleware/auth')
const { db } = require('../models/menu.model')
const router = express.Router()
const Orders = require('../models/orders.model')
const adminAuth = require('../middleware/adminAuth')


router.get('/',auth, async (req, res) => {
    try {
        const orders = await Orders.find()
        res.json(orders)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const orders = await Orders.find({ rest_id: req.params.id });
        res.json(orders)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/byCustomer/:id', auth, async (req, res) => {
    try {
        const orders = await Orders.find({ customer_id: req.params.id });
        res.json(orders)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/', async (req, res) => {
    const order = new Orders({
        rest_id: req.body.rest_id,
        menu_id: req.body.menu_id,
        customer_id: req.body.customer_id,
        quantity: req.body.quantity,
        date_created: req.body.date_created,
    })

    try {
        const a1 = await order.save()
        res.json(a1)
    } catch (err) {
        res.send('Error' + err)
    }
})


router.put('/:id', async (req, res) => {

    try {
        await Orders.findByIdAndUpdate(req.params.id, {
            "rest_id": req.body.rest_id,
            "menu_id": req.body.menu_id,
            "customer_id": req.body.customer_id,
            "quantity": req.body.quantity,
            "date_created": req.body.date_created,
        });
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        var order = await Orders.findByIdAndRemove(req.params.id);
        order = req.body;
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router