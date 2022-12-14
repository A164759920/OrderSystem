// 导入数据模型
const ORDER = require("../model/order.model.js");
const ORDER_DETAIL = require("../model/orderDetail.model.js");
// 定义数据模型关联 1:N
ORDER.hasMany(ORDER_DETAIL, {
  foreignKey: {
    name: "Ono",
  },
});
ORDER_DETAIL.belongsTo(ORDER, {
  foreignKey: {
    name: "Ono",
  },
});

/** addNewOrder 添加新订单
 * 订单内容如下：
 * - 订单编号 Ono
 * - 顾客编号 Cno
 * - 订单总价 Ototal
 * - dishList
 *  - 菜品名 Dname，菜品数量 Dcount，菜品单价 Dprice
 */
async function addNewOrder(ctx) {
  const { Ono, Cno, Ototal, dishList } = ctx.request.body;
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
  const newTask = [];
  /**
   * OrderDetail表的数据
   */
  dishList.forEach((item) => {
    item.Ono = Ono;
    console.log("细节数据", item);
    newTask.push(orderDetailFactory(item));
  });
  /**
   * Order表的数据
   */
  newTask.push(
    ORDER.create({
      Ono,
      Ototal,
      Cno,
    })
  );
  /**
   * 统一写入数据库
   */
  try {
    const res = await Promise.all(newTask);
    if (res) {
      console.log(res);
      return {
        code: 0,
        msg: "订单创建成功",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      code: 1,
      msg: "订单创建失败",
      error,
    };
  }
}

/**
 * DeleteOrder 删除已有订单
 * @param {String} Ono 订单编号
 */
async function deleteOrder(Ono) {
  // 判断该订单是否存在
  const flag = (await ORDER.findByPk(Ono)) ? true : false;
  if (flag) {
    const newTask = [];
    /**
     * 删除 ORDER表 数据
     */
    newTask.push(
      ORDER.destroy({
        where: {
          Ono,
        },
      })
    );
    /**
     * 删除 ORDER_DETAIL表 数据
     */
    newTask.push(
      ORDER_DETAIL.destroy({
        where: {
          Ono,
        },
      })
    );
    try {
      const res = await Promise.all(newTask);
      if (res) {
        return {
          code: 0,
          msg: "订单删除成功",
        };
      }
    } catch (error) {
      return {
        code: 1,
        msg: "订单删除失败",
        error,
      };
    }
  } else {
    ctx.body = {
      code: 1,
      msg: "订单删除失败",
      error: `订单号[${Ono}]不存在`,
    };
  }
}
/**
 * findAllOrder 获取所有订单信息
 */
async function findAllOrders() {
  try {
    const res = await ORDER.findAll();
    if (res) {
      console.log(res);
      return {
        code: 0,
        msg: "获取成功",
        data: res,
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "获取失败",
      error,
    };
  }
}
/**
 * findOrderByOno 获取订单细节
 *  @param {String} Ono 订单编号
 */
async function findDetailByOno(Ono) {
  try {
    const res = await ORDER.findAll({
      where: {
        Ono,
      },
      include: ORDER_DETAIL,
    });
    if (res) {
      return {
        code: 0,
        msg: "订单细节查询成功",
        data: res,
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "订单细节查询失败",
      error,
    };
  }
}

module.exports = {
  addNewOrder,
  deleteOrder,
  findAllOrders,
  findDetailByOno,
};
