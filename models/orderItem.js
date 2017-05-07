"use strict";

module.exports = function(sequelize, DataTypes) {
    var OrderItem = sequelize.define("orderItem", {
        quantity: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                OrderItem.belongsTo(models.item)
                models.item.hasMany(OrderItem)
            }
        }
    });

    return OrderItem;
};      
