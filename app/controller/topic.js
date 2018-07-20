'use strict';

const BaseController = require('./base');
const topicRule = {
  page: 'string',
};
const followRule = {
  topic_id: 'number',
  follow: 'boolean',
};

class TopicController extends BaseController {
  async index() {
    const { ctx } = this;
    const page = this.common();

    const result = await ctx.service.topic.hot(page);
    this.success(result);
  }
  async my() {
    const { ctx } = this;
    const page = this.common();

    const result = await ctx.service.topic.my(page);
    this.success(result);
  }

  async follow() {
    const that = this;
    const { ctx } = that;

    try {
      ctx.validate(followRule);
    } catch (error) {
      that.error(500, 'field validate error');
    }

    await ctx.service.topic.follow(ctx.request.body.topic_id, ctx.request.body.follow, ctx.request.body.id);
    that.success();
  }

  common() {
    const that = this;
    const { ctx } = that;

    try {
      ctx.validate(topicRule, ctx.query);
    } catch (error) {
      that.error(500, 'field validate error');
    }
    const page = parseInt(ctx.query.page);
    if (isNaN(page)) {
      that.error(500, 'field validate error');
    }
    return page;
  }
}

module.exports = TopicController;
