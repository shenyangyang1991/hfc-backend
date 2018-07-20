'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(jscode, encryptedData, iv) {
    const { ctx } = this;
    const userInfo = await this.common(jscode, encryptedData, iv);
    const invitation_code = ctx.helper.uuid8();
    const result = await ctx.model.User.findOrCreate({
      where: {
        open_id: userInfo.openId,
      },
      defaults: {
        open_id: userInfo.openId,
        nick_name: userInfo.nickName,
        avatar_url: userInfo.avatarUrl,
        invitation_code,
      },
    });
    const user = result[0].get({
      plain: true,
    });
    const userJson = {
      user_id: user.id,
      open_id: user.open_id,
      nick_name: user.nick_name,
      avatar_url: user.avatar_url,
      invitation_code: user.invitation_code,
    };
    return userJson;
  }
  async common(jscode, encryptedData, iv) {
    const { ctx } = this;
    const session = await ctx.helper.jscode2session(jscode);
    const userInfo = ctx.helper.decryptData(session.session_key, encryptedData, iv);
    return userInfo;
  }
}
module.exports = UserService;
