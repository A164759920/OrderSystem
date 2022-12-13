// 导入数据类型
const { DataTypes } = require("sequelize");

// 导入数据库实例
const seq = require("../database/dishOrder.js");

// 定义DISH_TYPE实例
const DISH_TYPE = seq.define(
  "DISH_TYPE",
  {
    Dtype: {
      type: DataTypes.STRING, // varchar 255
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "dishtypes",
  }
);
module.exports = DISH_TYPE;
