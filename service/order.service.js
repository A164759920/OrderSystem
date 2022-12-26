// 导入原始数据库对象
const seq = require("../database/dishOrder.js");
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
 * - 订单编号 Ono (后端生成)
 * - 顾客名称 Cname
 * - 订单总价 Ototal
 * - dishList
 *  - 菜品名 Dname，菜品数量 Dcount，菜品单价 Dprice
 */
async function addNewOrder(ctx) {
  const { Cname, Ototal, dishList } = ctx.request.body;
  function orderDetailFactory(dishObj) {
    return new Promise((resolve, reject) => {
      ORDER_DETAIL.create({
        Ono: dishObj.Ono,
        Dname: dishObj.Dname,
        Dcount: dishObj.Dcount,
        Dprice: dishObj.Dprice,
      }).then(
        (value) => {
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  /**
   * 生成订单任务
   */
  async function createTask() {
    const date = new Date().toLocaleDateString().split("/").join("");
    let dateOrderSum = "0";
    try {
      const res = await getDateOrderSum();
      if (res.code === 0) {
        dateOrderSum = (res.data.length + 1).toString().padStart(3, "0");
        const Ono = date + dateOrderSum;
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
            Ono: Ono,
            Ototal: Ototal,
            Cname: Cname,
          })
        );
        return newTask;
      }
    } catch (error) {
      return false;
    }
  }
  /**
   * 统一写入数据库
   */
  try {
    const taskArray = await createTask();
    if (taskArray) {
      try {
        const res = await Promise.all(taskArray);
        if (res) {
          return {
            code: 0,
            msg: "订单创建成功",
          };
        }
      } catch (error) {
        return {
          code: 1,
          msg: "订单创建失败",
          error,
        };
      }
    }
  } catch (error) {
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
    const res = await ORDER.findAll({
      include: ORDER_DETAIL,
      order:[['Odate','DESC']]
    });
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

/**
 * 获取每种菜品的销量
 */
async function getDishTypeSales() {
  try {
    const res = await seq.query(
      `SELECT Dname,SUM(Dcount) AS count
       FROM orderdetail
       GROUP BY Dname 
       ORDER BY count DESC`
    );
    if (res) {
      return {
        code: 0,
        msg: "获取成功",
        data: res[0],
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
 * 按要求统计营业额
 */
async function getSumCount() {
  try {
    const res = await seq.query(
      `SELECT Odate,SUM(Ototal) AS sum
       FROM orders
       GROUP BY Odate
       ORDER BY Odate ASC
       LIMIT 7`
    );
    if (res) {
      return {
        code: 0,
        msg: "获取成功",
        data: res[0],
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
 * 获取当天的订单数
 */
async function getDateOrderSum(myDate) {
  const date = new Date().toLocaleDateString().split("/").join("-") || myDate;
  // console.log(date)
  try {
    const res = await ORDER.findAll({
      where: {
        Odate: date,
      },
    });
    if (res) {
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
module.exports = {
  addNewOrder,
  deleteOrder,
  findAllOrders,
  findDetailByOno,
  getDishTypeSales,
  getSumCount,
  getDateOrderSum,
};
