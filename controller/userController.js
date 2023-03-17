// 注册/登录相关Controller

// 导入service服务
const { login, register } = require("../service/user.service.js");

async function registerController(ctx) {
  const { Cname, Cpwd, Cphone } = ctx.request.body;
  try {
    const res = await register(Cname, Cpwd, Cphone);
    console.log("结果", res);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[301]系统错误",
      error,
    };
  }
}
async function loginController(ctx) {
  const { Cname, Cpwd } = ctx.request.body;
  try {
    const res = await login(Cname, Cpwd);
    if (res) {
      ctx.body = res;
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "[302]系统错误",
      error
    };
  }
}

module.exports = {
  loginController,
  registerController,
};
