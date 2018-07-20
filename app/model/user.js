'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'uid',
    },
    open_id: {
      type: STRING(28),
      allowNull: false,
      comment: '微信open_id',
    },
    // user
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
    invitation_code: {
      type: STRING(8),
      allowNull: false,
      comment: '邀请码',
    },
  }, {
    comment: '系统用户映射微信用户表',
    indexes: [{
      unique: true, fields: [ 'open_id' ],
    }],
  });
  User.associate = function() {
    User.hasMany(app.model.UserTopic);
    User.hasMany(app.model.Posts);
    User.hasMany(app.model.Comment);
  };
  return User;
};
