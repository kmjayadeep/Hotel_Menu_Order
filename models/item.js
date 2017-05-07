"use strict";

module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("item", {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(6,2),
        availibility: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        category: DataTypes.ENUM('VEG','NONVEG','ICECREAM'),
        subCategory: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Item;
};
