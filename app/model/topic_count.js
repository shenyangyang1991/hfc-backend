'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const TopicCount = app.model.define('topic_count', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    join_count: {
      type: INTEGER,
      allowNull: false,
      comment: 'N人参与',
    },
    posts_count: {
      type: INTEGER,
      allowNull: false,
      comment: 'N条内容',
    },
    gold_count: {
      type: INTEGER,
      allowNull: false,
      comment: 'hfc',
    },
  }, {
    comment: '话题计数表',
  });
  TopicCount.associate = function() {
    TopicCount.belongsTo(app.model.Topic);
  };
  return TopicCount;
};
