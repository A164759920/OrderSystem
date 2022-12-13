// 数据类型
const { DataTypes } = require("sequelize");

// 引入数据库实例
const seq = require("../database/dishOrder.js");

// 定义ORDER_DETAIL实例
const ORDER_DETAIL = seq.define(
  "ORDER_DETAIL",
  {
    Ono: {
      type: DataTypes.STRING, // varchar 255
      primaryKey: true,
      allowNull: false,
    },
    Dname: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Dcount: {
      type: DataTypes.TINYINT(10),
      allowNull: false,
    },
    Dprice: {
      type: DataTypes.DOUBLE(16),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "ordertail",
  }
);

module.exports = ORDER_DETAIL;
