/**
 * @module User-API
 * @exports User-API
 */
// 导入数据模型
const CUSTOMER = require("../model/customer.model.js");

// 导入Token
const { createToken } = require("../jwt/index");
/**
 * @description 注册接口
 * @param {String} Cname 用户名
 * @param {String} Cpwd 密码
 * @param {String} Cphone 电话号码
 * @return {object} 返回注册结果
 * @example 返回示例
 * 成功:
 * {
 *    code:0,
 *    msg:"注册成功"
 * }
 * 失败:
 * {
 *    code:1,
 *    msg:"注册失败",
 *    error:"用户名已存在"
 * }
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
 * @description 登录接口
 * @param {String} Cname 用户名
 * @param {String} Cpwd 密码
 * @return {Object} 返回登录结果
 * @example 返回示例
 * 登录成功:
 * {
 *    code:0,
 *    msg:"登录成功",
 *    token:用于身份验证的token
 * }
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
      const token = createToken({
        username: Cname,
        password: Cpwd,
      });
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
