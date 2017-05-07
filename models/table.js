"use strict";

module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        pin: DataTypes.STRING //password
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Table;
};
