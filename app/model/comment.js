'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    title: {
      type: STRING(140),
      allowNull: false,
      comment: '标题',
    },
    reply_id: {
      type: INTEGER(11).UNSIGNED,
      comment: '回复人ID',
    },
    reply_name: {
      type: STRING(32),
      comment: '回复人姓名',
    },
    nick_name: {
      type: STRING(32),
      allowNull: false,
      comment: '昵称',
    },
    avatar_url: {
      type: STRING(255),
      allowNull: false,
      validate: {
        isUrl: true,
      },
      comment: '头像',
    },
  }, {
    comment: '评论表',
  });
  Comment.associate = function() {
    Comment.belongsTo(app.model.User);
    Comment.belongsTo(app.model.Posts);
  };
  return Comment;
};
