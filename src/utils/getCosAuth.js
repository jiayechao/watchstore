import $ from 'jquery';
let COS_AUTH_API = 'http://watch.canplay.com.cn/proxy/watch_fe_api/cosAuth';

const getCosAuth = (options, callback, fetchCB) => {
  let method = (options.Method || 'get').toLowerCase();
  let key = options.Key || '';
  let query = options.Query || {};
  let headers = options.Headers || {};
  let pathname = key.indexOf('/') === 0 ? key : '/' + key;
  let reqData = {
    method: method,
    pathname: pathname,
    query: query,
    headers: headers
  };

  // 自行替换可用的 xhr 方法，
  // 不能使用 promise 的方式，
  // COS JS库是链式调用的，会有 return this 的指向错误问题。

  $.ajax({
    type: 'get',
    url: COS_AUTH_API,
    data: reqData,
    success: function (res) {
      let callbackData = {};
      callbackData.code = res.code; // 0成功, 1文件过大 >10M, 2 底层加签接口异常
      callbackData.msg = res.msg;
      if (res.code === 0) {
        callbackData.Authorization = res.data.Authorization;
        callbackData.TmpSecretId = res.data.TmpSecretId;
        callbackData.TmpSecretKey = res.data.TmpSecretKey;
        callbackData.ExpiredTime = res.data.ExpiredTime;
        callbackData.XCosSecurityToken = res.data.XCosSecurityToken;
        callback(callbackData);
      } else {
        fetchCB(callbackData);
      }
    },
    error: function () {
      fetchCB({
        code: 3,
        msg: 'rest加签接口异常'
      });
    }
  });
};

export default getCosAuth;
