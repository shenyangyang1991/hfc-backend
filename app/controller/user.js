'use strict';

const BaseController = require('./base');
const userRule = {
  jscode: 'string',
  encryptedData: 'string',
  iv: 'string',
};

class UserController extends BaseController {
  async login() {
    // 是否已经登录
    if (this.user) {
      this.success(this.user);
    } else {
      const { ctx } = this;
      const { jscode, encryptedData, iv } = this.common();
      const user = await ctx.service.user.login(jscode, encryptedData, iv);
      ctx.session.user = user;
      this.success(user);
    }
  }
  common() {
    const that = this;
    const { ctx } = that;
    try {
      ctx.validate(userRule);
    } catch (error) {
      that.error(500, 'field validate error');
    }

    return ctx.request.body;
  }
}

module.exports = UserController;
