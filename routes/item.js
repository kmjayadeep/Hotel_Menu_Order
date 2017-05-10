var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.item.findAll()
        .then(items => {
            res.json(items)
        }).catch(err => {
            res.status(400).json(err)
        })
});

router.post('/:id', (req, res) => {
    models.item.findOne({
        where: {
            id: req.params.id
        }
    }).then(item => {
        item.price = req.body.price
        item.availability = req.body.availability
        return item.save()
    }).then(item => {
        res.json(item)
    }).catch(er => {
        res.staus(400).json(er)
    })
})

router.delete('/:id', (req, res) => {
    models.item.destroy({
        where: {
            id: req.params.id
        }
    }).then(r => {
        res.json(1)
    }).catch(err => {
        res.staus(400).json(err)
    })
})

router.post('/recommended', (req, res) => {
    models.item.findAll()
        .then(items => {
            res.json(items)
        }).catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;
