"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("admin", {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        pin: DataTypes.STRING, //password
        adminType: {
            type: DataTypes.ENUM('MANAGER', 'CHEF', 'WAITER')
        }
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Model;
};
