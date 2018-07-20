'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Posts = app.model.define('posts', {
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
    nick_name: {
      type: STRING(32),
      allowNull: false,
      comment: '昵称',
    },
    avatar_url: {
      type: STRING(255),
      allowNull: false,
      comment: '头像',
    },
  }, {
    comment: '帖子',
  });
  Posts.associate = function() {
    Posts.belongsTo(app.model.User);
    Posts.belongsTo(app.model.Topic);
    Posts.hasMany(app.model.PostsFile);
    Posts.hasMany(app.model.Comment);
  };
  return Posts;
};
