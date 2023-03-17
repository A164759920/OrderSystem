// 导入数据模型
const CUSTOMER = require("../model/customer.model.js");

// 导入Token
const { createToken } = require("../jwt/index");
console.log(createToken);
/**
 * 新用户注册
 */
async function register(Cname, Cpwd, Cphone) {
  const isExist = await CUSTOMER.findOne({ where: { Cname } });
  console.log("标识符", isExist);
  if (isExist) {
    return {
      code: 1,
      msg: "注册失败",
      error: `用户名${Cname}已存在`,
    };
  } else {
    //  isExist === null
    try {
      const res = await CUSTOMER.create({
        Cname,
        Cpwd,
        Cphone,
      });
      if (res) {
        return {
          code: 0,
          msg: "注册成功",
        };
      }
    } catch (error) {
      return {
        code: 1,
        msg: "注册失败",
        error,
      };
    }
  }
}

/**
 * 用户登录
 */
async function login(Cname, Cpwd) {
  const user = await CUSTOMER.findOne({ where: { Cname } });
  if (user === null) {
    return {
      code: 1,
      msg: "登录失败",
      error: `用户名[${Cname}]不存在`,
    };
  } else {
    const flag = user.Cpwd === Cpwd ? true : false;
    if (flag) {
      // 生成token
      const token = createToken(
        {
          username: Cname,
          password: Cpwd,
        },
        60
      );
      console.log("先token", token);
      if (token) {
        return {
          code: 0,
          msg: "登录成功",
          token,
          // 暂时不用token
        };
      } else {
        return {
          code: 1,
          msg: "登录失败",
          error: "token生成失败",
          // 暂时不用token
        };
      }
    } else {
      return {
        code: 1,
        msg: "登录失败",
        error: `密码错误`,
      };
    }
  }
}

module.exports = {
  login,
  register,
};
