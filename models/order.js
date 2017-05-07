"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        comments: DataTypes.STRING,
        status: DataTypes.ENUM('PLACED','READY','DELIVERED'),
        amount: DataTypes.DECIMAL(6,2)
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
