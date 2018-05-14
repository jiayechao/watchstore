import axios from 'axios';
import qs from 'qs';
import store from '../store';
// import tools from '../utils/tools';
// import { MessageBox, Message } from 'element-ui';
import { Message } from 'element-ui';
// console.log(store);
let initOptions = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  data: {
    userId: '',
    token: '',
    times: Date.now(),
    platform: 5
  }
};

function getUser() {
  initOptions.data.userId = store.getters.userId;
  initOptions.data.token = store.getters.token;
}

export function fetchGet(options, load, time, state) {
  options.params = {...initOptions.data, ...options.params};
  return fetch({...options, ...{method: 'get'}}, load, time, state);
}

export function fetchPost(options, load, time, state) {
  getUser();
  options.data = qs.stringify({...initOptions.data, ...options.data});
  return fetch({...options, ...{method: 'post'}}, load, time, state);
}

export function fetch(options, load, time = 500, state = 'err') {
  // 打开loading
  // if (load === 0) tools.indicator();
  return (axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    // 超时
    timeout: 15 * 1000
  }))(options).then(res => {
    // 这里针对支付宝支付hack
    if (options.url.indexOf('link2PCAliPay') > 0 && !res.data.code) {
      return Promise.resolve(res.data);
    }
    if (res.data.code !== 0) {
      store.dispatch('closeLoading');
      if (res.data.code > 0 && res.data.code < 8999) {
        if (res.data.code === 10 || res.data.code === 6) { // toke无效，验证不通过，需要重新登录，跳转到登录页
          // 这里的注释是以后如果需要用户决定跳转的话可以用
          // MessageBox.confirm('您的登录已过期，是否跳转到登录页?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          // // 这里清除localstorage里的userinfo，将当前路由加入params，登陆成功后返回这个页面
          //   store.dispath('FedLogOut');
          //   router.push({ path: '/login' });
          // }).catch(() => {
          //   store.dispath('FedLogOut');
          // });
          store.dispatch('FedLogOut'); // 清除前端缓存
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }
      // 这里针对返回失败的数据做一个处理，传递错误到catch
      return Promise.reject(res.data);
    } else {
      store.dispatch('closeLoading');
      // console.log(1);
      return Promise.resolve(res.data);
    }
  }).catch(err => {
    store.dispatch('closeLoading');
    // 这里针对断开网络的提示做一个判断，要在正式线测试
    if (err.code) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      return Promise.reject(err); // 继续传递错误，可以让单个的post捕捉到
    } else {
      // Something happened in setting up the request that triggered an Error
      Message({
        message: '网络链接超时，请检查网络',
        type: 'error'
      });
      return Promise.reject(err);
    }
  });
}
