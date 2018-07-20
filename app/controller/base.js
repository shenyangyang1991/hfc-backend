'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    this.ctx.status = 200;
    this.ctx.body = {
      code: 200,
      data,
      message: 'success',
    };
  }

  error(code, msg) {
    this.ctx.throw(code, msg);
  }
}

module.exports = BaseController;
