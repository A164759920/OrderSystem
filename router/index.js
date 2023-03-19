const Router = require("koa-router");
const router = new Router();

// 导入middle
const { AuthToken } = require("../jwt/authToken.middleware.js");

// 导入controller
// ORDER类
const {
  addOrderController,
  DeleteOrderController,
  findAllOrderController,
  findDetailController,
  getdishTypeSalesController,
  getTopDishTypeController,
  getSumCountController,
  getDateOrderSumController,
} = require("../controller/orderController.js");

// DISH类
const {
  findAllDishesController,
  findAllDishTypeController,
  addDishController,
  deleteDishController,
  editorDishController,
} = require("../controller/dishController.js");

// CUSTOMER类
const {
  loginController,
  registerController,
} = require("../controller/userController.js");

// 导入TOKEN类
const { refreshTokenController } = require("../jwt/token.Controller.js");

// ORDER类 接口
router.post("/OrderAdd", AuthToken, addOrderController);
router.post("/OrderDelete", AuthToken, DeleteOrderController);
router.get("/OrderAll", AuthToken, findAllOrderController);
router.get("/OrderDetail", AuthToken, findDetailController);
router.get("/OrderSumCount", AuthToken, getSumCountController);
router.get("/OrderDate", AuthToken, getDateOrderSumController);

// DISH类 接口
router.get("/DishAll", AuthToken, findAllDishesController);
router.get("/DishTypeAll", AuthToken, findAllDishTypeController);
router.get("/DishTypeSales", AuthToken, getdishTypeSalesController);
router.get("/DishTopType", AuthToken, getTopDishTypeController);
router.post("/DishAdd", AuthToken, addDishController);
router.post("/DishDelete", AuthToken, deleteDishController);
router.post("/DishEditor", AuthToken, editorDishController);

// CUSTOMER类 接口
router.post("/login", loginController);
router.post("/register", registerController);

// TOKEN接口
router.post("/refreshToken", AuthToken, refreshTokenController);

// 测试接口
router.post("/test", (ctx) => {
  ctx.body = {
    code: 0,
    msg: "成功响应",
  };
});

module.exports = {
  router,
};
