// 点餐controller

// 导入数据模型
const ORDER = require("../model/order.model.js");
const ORDER_DETAIL = require("../model/orderDetail.model.js");
const DISH = require("../model/dish.model.js");
const DISH_TYPE = require("../model/dishType.model.js");
const CUSTOMER = require("../model/customer.model.js");

/** addOrderController 添加新订单
 * 订单内容如下：
 * - 订单编号 Ono
 * - 顾客编号 Cno
 * - 订单总价 Ototal
 * - dishList
 *  - 菜品名 Dname，菜品数量 Dcount，菜品单价 Dprice
 */
async function addOrderController(ctx) {
  const { Ono, Cno, Ototal, dishesList } = ctx.request.body;
  const newOrder = await ORDER.create({
    Ono,
    Ototal,
    Cno,
  }).then((value) => {
    console.log(value);
  });
  function orderDetailFactory(dishObj) {
    return new Promise((resolve, reject) => {
      ORDER_DETAIL.create(dishObj).then(
        (value) => {
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
    }
    
}

module.exports = {
  addOrderController,
};
