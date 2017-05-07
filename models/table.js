"use strict";

module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
        name: DataTypes.STRING,
        pin: DataTypes.STRING //password
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Table;
};
