// 导入数据模型
const DISH = require("../model/dish.model.js");
const DISH_TYPE = require("../model/dishType.model.js");

// 定义数据模型间的关联
DISH_TYPE.hasMany(DISH, {
  foreignKey: {
    name: "Dtype",
  },
});
DISH.belongsTo(DISH_TYPE, {
  foreignKey: {
    name: "Dtype",
  },
});

/**
 * 获取所有菜单详细信息
 */
async function findAllDishes() {
  let dishType = (await DISH_TYPE.findAll()) || [];
  const dishData = {};
  function getDishFactory(Dtype) {
    return new Promise((resolve, reject) => {
      DISH.findAll({
        where: {
          Dtype,
        },
      }).then(
        (value) => {
          resolve(value);
          dishData[Dtype] = value; // 创建字典
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  const newTask = [];
  if (dishType.length > 0) {
    dishType.forEach((item) => {
      console.log(item);
      newTask.push(getDishFactory(item.Dtype));
    });
  }
  try {
    const res = await Promise.all(newTask);
    if (res) {
      return {
        code: 0,
        msg: "获取菜单成功",
        data: dishData,
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "获取菜单失败",
      error,
    };
  }
}
/**
 * 获取所有菜单分类
 */
async function findAllDishType() {
  try {
    const res = await DISH_TYPE.findAll();
    if (res) {
      const resData = [];
      // 直接暴露分类名
      res.forEach((item) => {
        resData.push(item.Dtype);
      });
      return {
        code: 0,
        msg: "获取菜单分类成功",
        data: resData,
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "获取菜单分类失败",
      error,
    };
  }
}
module.exports = {
  findAllDishes,
  findAllDishType,
};
