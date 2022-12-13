// 数据类型
const { DataTypes } = require("sequelize");

// 引入数据库实例
const seq = require("../database/dishOrder.js");

// 定义DISH实例
const DISH = seq.define(
  "DISH",
  {
    Dname: {
      type: DataTypes.STRING, // varchar 255
      primaryKey: true,
      allowNull: false,
    },
    Dprice: {
      type: DataTypes.DOUBLE(16),
      allowNull: false,
    },
    Dtype: {
      type: DataTypes.STRING, // varchar 255
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "dishes",
  }
);
module.exports = DISH;
