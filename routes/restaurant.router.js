const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.model')
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth')


router.get('/', auth, async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
        res.json(restaurants)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        res.json(restaurant)
    }
        
    catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/',adminAuth, async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        city: req.body.city,
        lat: req.body.lat,
        lng: req.body.lng,
        phone: req.body.phone,
        image: req.body.image
    })

    try {
        const a1 = await restaurant.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }
})

router.delete('/:id',adminAuth, async (req, res) => {
    try {
        var menu = await Restaurant.findByIdAndRemove(req.params.id);
        menu = req.body;
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

router.put('/:id',adminAuth, async (req, res) => {

    try {
        await Restaurant.findByIdAndUpdate(req.params.id, {
            "name": req.body.name,
            "city": req.body.city,
            "lat": req.body.lat,
            "lng": req.body.lng,
            "phone": req.body.phone,
            "image": req.body.image
        });
        res.json({ "done": "true" })
    } catch (err) {
        res.send('Error' + err)
    }
})

// router.patch('/:id', async (req, res) => {
//     try {
//         const alien = await Alien.findById(req.params.id)
//         alien.sub = req.body.sub
//         const a1 = await alien.save()
//         res.json(a1)
//     } catch (err) {
//         res.send('Error')
//     }

// })

module.exports = router