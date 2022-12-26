// 菜单/菜品Controller

// 导入service层服务
const {
  findAllDishes,
  findAllDishType,
  deleteDish,
  editorDish,
} = require("../service/dish.service.js");

async function findAllDishesController(ctx) {
  try {
    const res = await findAllDishes();
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[201]系统错误",
      error,
    };
  }
}
async function findAllDishTypeController(ctx) {
  try {
    const res = await findAllDishType();
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[202]系统错误",
      error,
    };
  }
}

async function deleteDishController(ctx) {
  const { Dname } = ctx.request.body;
  try {
    const res = await deleteDish(Dname);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[203]系统错误",
      error,
    };
  }
}

async function editorDishController(ctx) {
  const { Dname, fieldKey, newData } = ctx.request.body;
  try {
    const res = await editorDish(Dname,fieldKey, newData);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[204]系统错误",
      error,
    };
  }
}
module.exports = {
  findAllDishesController,
  findAllDishTypeController,
  deleteDishController,
  editorDishController,
};
