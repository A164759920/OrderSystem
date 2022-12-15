// 数据类型
const { DataTypes } = require("sequelize");

// 引入数据库实例
const seq = require("../database/dishOrder.js");

// 定义ORDER实例
const ORDER = seq.define(
  "ORDER",
  {
    Ono: {
      type: DataTypes.STRING, // varchar 255
      primaryKey: true,
      allowNull: false,
    },
    Odate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Ototal: {
      type: DataTypes.DOUBLE(16),
      allowNull: false,
    },
    Cname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // 启用时间戳
    updatedAt: false,
    createdAt: "Odate",
    tableName: "orders",
  }
);

module.exports = ORDER;
