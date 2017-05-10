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


router.get('/placed', (req, res) => {
    models.order.findAll({
            where: {
                status: 'PLACED'
            },
            include: [{
                model: models.table,
            }, {
                model: models.orderItem,
                include: models.item
            }]
        })
        .then(ordersData => {
            // res.json(ordersData)
            let orders = ordersData.map(order => {
                let o = {
                    id: order.id,
                    comments: order.comments,
                    status: order.status,
                    amount: order.amount,
                    table: order.table.name,
                    orderItems: order.orderItems
                }
                return o
            })
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
})

router.get('/ready', (req, res) => {
    models.order.findAll({
            where: {
                status: 'READY'
            },
            include: [{
                model: models.table,
            }, {
                model: models.orderItem,
                include: models.item
            }]
        })
        .then(ordersData => {
            // res.json(ordersData)
            let orders = ordersData.map(order => {
                let o = {
                    id: order.id,
                    comments: order.comments,
                    status: order.status,
                    amount: order.amount,
                    table: order.table.name,
                    orderItems: order.orderItems
                }
                return o
            })
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
})


router.get('/:id', (req, res) => {
    models.order.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(orders => {
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
});

router.get('/table/:table', (req, res) => {
    models.order.findAll({
            where: {
                tableId: req.body.table
            }
        })
        .then(orders => {
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
})

router.post('/', (req, res) => {
    var order = {
        tableId: req.body.tableId,
        comments: req.body.comments,
        amount: req.body.amount,
    }
    models.order.create(order)
        .then(newOrder => {
            order = newOrder
            var items = req.body.items.map(item => {
                item.orderId = newOrder.id
                delete item.id
                return item
            })
            return models.orderItem.bulkCreate(items)
        }).then(() => {
            res.json(order)
        }).catch(err => {
            res.status(400).json(err)
        })
})

router.post('/status/:orderId', (req, res) => {
    models.order.findOne({
        where: {
            id: req.params.orderId
        }
    }).then(order => {
        order.status = req.body.status
        return order.save()
    }).then(order => {
        res.json(order)
    }).catch(err => {
        res.status(400).json(err)

    })
})

module.exports = router;
