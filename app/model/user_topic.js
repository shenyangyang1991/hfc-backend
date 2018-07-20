'use strict';

module.exports = app => {
  const { BOOLEAN, INTEGER } = app.Sequelize;

  const UserTopic = app.model.define('user_topic', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    follow: {
      type: BOOLEAN,
      allowNull: false,
      comment: '关注',
    },
  }, {
    comment: '用户话题关注表',
  });
  UserTopic.associate = function() {
    UserTopic.belongsTo(app.model.User);
    UserTopic.belongsTo(app.model.Topic);
  };
  return UserTopic;
};
