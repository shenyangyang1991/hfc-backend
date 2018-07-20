'use strict';

module.exports = app => {
  const { BOOLEAN, INTEGER } = app.Sequelize;

  const UserPosts = app.model.define('user_posts', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    like: {
      type: BOOLEAN,
      allowNull: false,
      comment: '喜欢',
    },
  }, {
    comment: '帖子喜欢表',
  });
  UserPosts.associate = function() {
    UserPosts.belongsTo(app.model.User);
    UserPosts.belongsTo(app.model.Posts);
  };
  return UserPosts;
};
