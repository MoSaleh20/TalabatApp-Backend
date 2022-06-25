const express = require('express')
const router = express.Router()
const Customer = require('../models/customer.model')
const adminAuth = require('../middleware/adminAuth')


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.json(customer)
    }

    catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    const customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
    })

    try {
        const a1 = await customer.save()
        res.json(a1)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        var menu = await Customer.findByIdAndRemove(req.params.id);
        menu = req.body;
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

router.put('/:id', async (req, res) => {

    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "phone": req.body.phone,
        });
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})


module.exports = router