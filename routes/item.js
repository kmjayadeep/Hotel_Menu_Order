var express = require('express');
var router = express.Router();
var models = require('../models')
var _ = require('underscore')

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
        res.status(400).json(er)
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
        res.status(400).json(err)
    })
})

router.post('/order/recommended', (req, res) => {
    var itemIds = _.pluck(req.body.items, 'id')
    models.order.findAll({
        include: [{
            model: models.orderItem,
            where: {
                itemId: {
                    $in: itemIds
                }
            }
        }],
        attributes: ['id']
    }).then(order => {
        let orderIds = _.pluck(order, 'id')
        return models.order.findAll({
            where: {
                id: {
                    $in: orderIds
                }
            },
            include: [models.orderItem]
        })
    }).then(orders => {
        var items = _.pluck(orders, 'orderItems')
        items = _.pluck(_.flatten(items), 'itemId')
        var rec = items.filter(item => {
            return itemIds.indexOf(item + '') == -1
        })
        rec = _.uniq(rec)
        models.item.findAll({
            where: {
                id: {
                    $in: rec
                }
            }
        }).then(items => {
            res.json(items)
        }).catch(err => {
            models.item.findAll()
                .then(items => {
                    res.json(items)
                }).catch(err => {
                    res.status(400).json(err)
                })
        })
    })

})

module.exports = router;
