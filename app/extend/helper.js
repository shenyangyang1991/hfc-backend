'use strict';

const crypto = require('crypto');
const uuid = require('node-uuid');

const chars = [ 'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z' ];

module.exports = {
  async jscode2session(jscode) {
    const { app, ctx } = this;
    const { weapp } = app.config;

    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const params = `?appid=${weapp.appId}&secret=${weapp.appSecret}&js_code=${jscode}&grant_type=authorization_code`;
    const response = await ctx.curl(`${apiUrl}${params}`, {
      contentType: 'json',
      dataType: 'json',
    });
    const { status, data } = response;
    if (status !== 200) {
      ctx.throw(500, 'jscode2session error');
    }
    if (status === 200) {
      if (!data.openid) {
        ctx.throw(500, 'openid error');
      }
      return data;
    }
  },
  decryptData(sessionKey, encryptedData, iv) {
    const { app, ctx } = this;
    const { weapp } = app.config;

    const sessionKeyBs64 = new Buffer(sessionKey, 'base64');
    const encryptedDataBs64 = new Buffer(encryptedData, 'base64');
    const ivBs64 = new Buffer(iv, 'base64');

    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBs64, ivBs64);
    decipher.setAutoPadding(true);
    const decodedStr = decipher.update(encryptedDataBs64, 'binary', 'utf8');
    const decipherStr = decipher.final('utf8');
    const dataStr = decodedStr + decipherStr;

    const dataObj = JSON.parse(dataStr);
    if (dataObj.watermark.appid !== weapp.appId) {
      ctx.throw(500, 'appid error');
    }
    return dataObj;
  },
  uuid8() {
    const uid = uuid.v1().replace(/\-/g, '');
    const shortIndex = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
    const shortUid = [];
    shortIndex.forEach(item => {
      const str = uid.substr(item * 4, item * 4 + 4);
      const factor = parseInt(str, 16);
      shortUid.push(chars[factor % 0x3E]);
    });
    return shortUid.join('');
  },
};
