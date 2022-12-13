// 数据类型
const { DataTypes } = require("sequelize");

// 引入数据库实例
const seq = require("../database/dishOrder.js");

// 定义CUSTOMER实例
const CUSTOMER = seq.define(
  "CUSTOMER",
  {
    Cno: {
      type: DataTypes.STRING, // varchar 255
      primaryKey: true,
      allowNull: false,
    },
    Cname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cphone: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "customers",
  }
);

module.exports = CUSTOMER;
