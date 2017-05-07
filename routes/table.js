var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.table.findAll({
            attributes: ['id', 'name']
        })
        .then(tables => {
            res.json(tables)
        }).catch(err => {
            res.status(400).json(err)
        })
});

router.post('/login', (req, res) => {
    let name = req.body.name
    let pin = req.body.pin
    models.table.findOne({
        where: {
            name: name,
            pin: pin
        },
        attributes: ['id', 'name']
    }).then(table => {
        if (table)
            res.json(table)
        else
            res.status(401).json({
                code: 0,
                message: 'Invalid login'
            })
    }).catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router;
