const Router = require("koa-router");
const router = new Router();

// 导入controller
// ORDER类
const {
  addOrderController,
  DeleteOrderController,
  findAllOrderController,
  findDetailController,
} = require("../controller/orderController.js");

// DISH类
const {
  findAllDishesController,
  findAllDishTypeController,
} = require("../controller/dishController.js");

// CUSTOMER类
const {
  loginController,
  registerController,
} = require("../controller/userController.js");

// ORDER类 接口
router.post("/OrderAdd", addOrderController);
router.post("/OrderDelete", DeleteOrderController);
router.get("/OrderAll", findAllOrderController);
router.get("/OrderDetail", findDetailController);

// DISH类 接口
router.get("/DishAll", findAllDishesController);
router.get("/DishTypeAll", findAllDishTypeController);

// CUSTOMER类 接口
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = {
  router,
};
