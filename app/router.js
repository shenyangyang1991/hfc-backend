'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/login', controller.user.login);
  router.get('/api/v1/topic/hot', controller.topic.index);
  router.get('/api/v1/topic/my', controller.topic.my);
  router.post('/api/v1/topic/follow', controller.topic.follow);
};
