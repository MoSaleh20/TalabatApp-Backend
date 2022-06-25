const express = require('express')
const { db } = require('../models/menu.model')
const router = express.Router()
const RestRating = require('../models/restaurant.rating.model')
const adminAuth = require('../middleware/adminAuth')

router.get('/', async (req, res) => {
    try {
        const restRating = await RestRating.find()
        res.json(restRating)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const restRating = await RestRating.find({ rest_id: req.params.id });
        res.json(restRating)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    const restRating = new RestRating({
        rest_id: req.body.rest_id,
        customer_id: req.body.customer_id,
        rating: req.body.rating,
        date_created: req.body.date_created,
    })

    try {
        const a1 = await restRating.save()
        res.json(a1)
    } catch (err) {
        res.send('Error' + err)
    }
})


router.put('/:id', async (req, res) => {

    try {
        await RestRating.findByIdAndUpdate(req.params.id, {
            "rest_id": req.body.rest_id,
            "customer_id": req.body.customer_id,
            "rating": req.body.rating,
            "date_created": req.body.date_created,
        });
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        var restRating = await RestRating.findByIdAndRemove(req.params.id);
        order = req.body;
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router