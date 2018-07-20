'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const PostsFile = app.model.define('posts_file', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    file: {
      type: STRING(255),
      allowNull: false,
      comment: '文件',
    },
  }, {
    comment: '发帖文件',
  });
  PostsFile.associate = function() {
    PostsFile.belongsTo(app.model.Posts);
  };
  return PostsFile;
};
