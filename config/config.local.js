'use strict';

module.exports = () => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    database: 'backend456',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    omitNull: true,
    define: {
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: true,
    },
    timezone: '+08:00',
    sync: {
      force: false,
    },
  };

  config.weapp = {
    appId: 'wxf4ae9ddb9ec77f2e',
    appSecret: 'dacb0d4c7f111f4e7428d4ea03ae21b0',
  };

  return config;
};
