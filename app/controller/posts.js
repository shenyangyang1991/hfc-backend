'use strict';

const Controller = require('egg').Controller;
const postsRule = {
  topic_id: 'string',
  page: 'string',
};

class PostsController extends Controller {
  async index() {
    const that = this;
    const { ctx } = that;

    try {
      ctx.validate(postsRule, ctx.query);
    } catch (error) {
      that.error(500, 'field validate error');
    }

    const page = parseInt(ctx.query.page);
    const topic_id = parseInt(ctx.query.topic_id);
    if (isNaN(page) || isNaN(topic_id) ) {
      that.error(500, 'field validate error');
    }
  }
}

module.exports = PostsController;
