var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.order.findAll()
        .then(orders => {
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router;
