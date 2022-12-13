const Router = require("koa-router");
const router = new Router();

// 导入controller

// 导入middleware
const { addOrderController } = require("../controller/orderController.js");
// API接口
router.post("/addOrder", addOrderController);
module.exports = {
  router,
};
