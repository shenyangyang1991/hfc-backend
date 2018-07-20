'use strict';

const Service = require('egg').Service;
const format = require('date-format');

class TopicService extends Service {
  async hot(page) {
    const { ctx } = this;
    const user = ctx.session.user;
    const topics = [];
    const resultJson = [];
    const dateStr = format.asString('yyyy-MM-dd hh:mm:ss', new Date());
    const hotList = await ctx.model.query(`select max(topic.id) as topic_id from topic left outer join posts on topic.id = posts.topic_id and (posts.deleted_at > '${dateStr}' or posts.deleted_at is null) where (topic.deleted_at > '${dateStr}' or topic.deleted_at is null) group by topic.id order by max(posts.id) desc limit ${page * 10}, 10;`, {
      type: 'SELECT',
    });

    if (!hotList || !hotList.length) {
      return resultJson;
    }
    hotList.forEach(item => {
      topics.push(item.topic_id);
    });

    const topicsList = await ctx.model.Topic.findAll({
      include: [{
        model: ctx.model.UserTopic,
        required: false,
        where: {
          user_id: user.user_id,
        },
        attributes: [ 'follow' ],
      }, {
        model: ctx.model.Posts,
        separate: true,
        limit: 3,
        order: [[ 'id', 'desc' ]],
        attributes: [ 'id', 'title', 'nick_name', 'avatar_url', 'topic_id', 'user_id' ],
        include: [{
          model: ctx.model.PostsFile,
          attributes: [ 'id', 'file', 'post_id' ],
        }],
      }, {
        model: ctx.model.TopicCount,
        attributes: [ 'id', 'join_count', 'posts_count', 'topic_id' ],
      }],
      attributes: [ 'id', 'title' ],
      where: {
        id: {
          $in: topics,
        },
      },
      order: [ ctx.model.fn('field', ctx.model.col('topic.id'), ...topics) ],
    });

    if (!topicsList || !topicsList.length) {
      return resultJson;
    }

    topicsList.forEach(item => {
      resultJson.push(item.get({
        plain: true,
      }));
    });
    return resultJson;
  }

  async my(page) {
    const { ctx } = this;
    const user = ctx.session.user;
    const topics = [];
    const resultJson = [];
    const userTopics = await ctx.model.UserTopic.findAll({
      where: {
        user_id: user.user_id,
        follow: true,
      },
      attributes: [ 'topic_id' ],
      order: [[ 'created_at', 'desc' ]],
      limit: 10,
      offset: page * 10,
      raw: true,
    });

    if (!userTopics || !userTopics.length) {
      return resultJson;
    }
    userTopics.forEach(item => {
      topics.push(item.topic_id);
    });

    const topicList = await ctx.model.Topic.findAll({
      include: [{
        model: ctx.model.Posts,
        separate: true,
        limit: 3,
        order: [[ 'id', 'desc' ]],
        attributes: [ 'id', 'title', 'nick_name', 'avatar_url', 'topic_id', 'user_id' ],
        include: [{
          model: ctx.model.PostsFile,
          attributes: [ 'id', 'file', 'post_id' ],
        }],
      }, {
        model: ctx.model.TopicCount,
        attributes: [ 'id', 'join_count', 'posts_count', 'topic_id' ],
      }],
      attributes: [ 'id', 'title' ],
      where: {
        id: {
          $in: topics,
        },
      },
      order: [ ctx.model.fn('field', ctx.model.col('topic.id'), ...topics) ],
    });

    if (!topicList || !topicList.length) {
      return resultJson;
    }

    topicList.forEach(item => {
      resultJson.push(item.get({
        plain: true,
      }));
    });
    return resultJson;
  }

  async follow(topic_id, follow, id) {
    const { ctx } = this;
    const user = ctx.session.user;
    const json = {};
    if (id) {
      json.id = id;
    }
    json.topic_id = topic_id;
    json.follow = follow;
    json.user_id = user.user_id;
    await ctx.model.UserTopic.upsert(json, {
      fields: [ 'follow' ],
    });
  }
}
module.exports = TopicService;
