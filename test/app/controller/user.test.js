'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should Post /api/v1/login', () => {
    return app.httpRequest()
      .post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .set('x-requested-with', 'XMLHttpRequest')
      .send({
        jscode: '081LUIk30TeA1E10inj3082Gk30LUIkV',
        encryptedData: 'A3fnPmVen3Eyp3CSqCCxH3M1s9NfeF5c/QkpXCjjXP1dyufJuFzL0TwHFD/r19+s4i3seVSRcTdDHa3avH7ImsBpObY47lFaL/WK4NTkyQuFR1BkQQr26b40OTEE76YhYecFFvpcguTyJ9ohrlx7u0D1ulFTi5yPnZE6b6bprAWpwapuNcnmdmBYOXRu7wdlM1BXwukOElLD4/1DgGFw5yYGifXVschjeL/Wf5xhkRl0nm6Fl+SIIGoWo7pbPBjeoVboZoMzGKwPgP9ApaFSCHvvPJPCpDBqtJo5llGEyhdECRBAcSxbAwp/S9+Ozk3iz3XnEtSBlBsFDNvCS41PKMs4Y7fmPbIJmqI/hf5ZMwaWYqNQZir9c1Un41I1t3Y+Xor09ttH+H7okj3uc/xMhNJiOI9LE6fzFzMtLGN1l8J3EoO5ygZhsRx5FhR+jjufSF6I5Hp5Wkj8qHU0Upkj2IlyWfegBhJNhL8SXxJKi2Q=',
        iv: 'eLAybRPpNl2MroFgyzfoSw==',
      })
      .expect(200);
  });
});
