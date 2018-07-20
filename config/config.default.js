'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1530075860096_2235';

  // add your config here
  config.middleware = [ 'authentication', 'limit' ];

  // add security config
  config.security = {
    csrf: {
      enable: false,
    },
    // xframe: {
    //   enable: false,
    // },
  };

  // add session config
  config.session = {
    key: 'HFC_SESS',
    maxAge: 1800 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  // add error handler
  config.onerror = {
    accepts(ctx) {
      if (ctx.app.config.env === 'prod') {
        return 'json';
      }
      return 'html';
    },
    json(err, ctx) {
      let errJson = {};
      const status = err.status || 500;
      const errMsg = status === 500
        ? '网络服务器错误'
        : err.message;
      errJson = {
        code: status,
        message: errMsg,
      };
      ctx.body = errJson;
      ctx.status = 200;
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.limit = {
    duration: 60000,
    errorMessage: { errMsg: '放松双眼，休息片刻' },
    headers: {
      remaining: 'Hfc-Limit-Remaining',
      reset: 'Hfc-Limit-Reset',
      total: 'Hfc-Limit-Total',
    },
    max: 100,
    disableHeader: false,
    ignore: '/api/v1/login',
  };

  config.authentication = {
    ignore: '/api/v1/login',
  };

  return config;
};
