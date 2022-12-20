// 点餐controller

// 导入service层数据服务
const {
  addNewOrder,
  deleteOrder,
  findAllOrders,
  findDetailByOno,
  getDishTypeSales,
  getSumCount,
  getDateOrderSum,
} = require("../service/order.service.js");

/**
 * 添加新订单
 */
async function addOrderController(ctx) {
  try {
    const res = await addNewOrder(ctx);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[101]系统错误",
      error,
    };
  }
}
/**
 *  删除已有订单
 */
async function DeleteOrderController(ctx) {
  // 解构订单编号
  const { Ono } = ctx.request.body;
  try {
    const res = await deleteOrder(Ono);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[102]订单删除失败",
      error,
    };
  }
}
/**
 * 获取所有订单信息
 */
async function findAllOrderController(ctx) {
  try {
    const res = await findAllOrders();
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[103]获取失败",
    };
  }
}
/**
 * 获取指定订单细节内容
 */
async function findDetailController(ctx) {
  const { Ono } = ctx.query;
  console.log("测试测试", Ono);
  try {
    const res = await findDetailByOno(Ono);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[104]系统错误",
      error,
    };
  }
}
/**
 *  获取每种菜品的总销量
 */
async function getdishTypeSalesController(ctx) {
  try {
    const res = await getDishTypeSales();
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[105]系统错误",
      error,
    };
  }
}
/**
 *  获取七日内的营业额数据
 */
async function getSumCountController(ctx) {
  try {
    const res = await getSumCount();
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[106]系统错误",
      error,
    };
  }
}
/**
 * 获取指定日期的订单数量 默认为当天
 */
async function getDateOrderSumController(ctx) {
  const { date } = ctx.query;
  try {
    const res = await getDateOrderSum(date);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[107]系统错误",
      error,
    };
  }
}
module.exports = {
  addOrderController,
  DeleteOrderController,
  findAllOrderController,
  findDetailController,
  getdishTypeSalesController,
  getSumCountController,
  getDateOrderSumController,
};
