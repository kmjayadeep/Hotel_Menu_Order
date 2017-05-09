var express = require('express');
var router = express.Router();
var models = require('../models')


router.post('/login', (req, res) => {
    let name = req.body.name
    let pin = req.body.pin
    let adminType = req.body.adminType
    models.admin.findOne({
        where: {
            name: name,
            pin: pin,
            adminType: adminType
        },
        attributes: ['id', 'name','adminType']
    }).then(admin => {
        if (admin)
            res.json(admin)
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
