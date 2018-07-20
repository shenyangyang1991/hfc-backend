'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Topic = app.model.define('topic', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    title: {
      type: STRING(14),
      allowNull: false,
      comment: '标题',
    },
  }, {
    comment: '话题',
  });
  Topic.associate = function() {
    Topic.hasMany(app.model.UserTopic);
    Topic.hasMany(app.model.Posts);
    Topic.hasOne(app.model.TopicCount);
  };
  return Topic;
};
