"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("order", {
        comments: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('PLACED', 'READY', 'DELIVERED'),
            defaultValue: 'PLACED'
        },
        amount: DataTypes.DECIMAL(6, 2)
    }, {
        classMethods: {
            associate: function(models) {
                Order.hasMany(models.orderItem)
                models.orderItem.belongsTo(Order)
                Order.belongsTo(models.table)
                models.table.hasMany(Order)
            }
        }
    });

    return Order;
};
