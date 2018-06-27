'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const user_id = ctx.session.user_id;
    if (user_id) {
      await next();
    } else {
      ctx.throw(401, '登录状态失效');
    }
  };
};
