// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import md5 from 'js-md5';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 样式重置
import 'normalize.css';
import moment from 'moment';
// 常用工具
import tools from './utils/tools';
// 接口api path
import path from './api/api-path';
// 字体
import './icons';
// 请求封装
import { fetchGet, fetchPost } from './utils/fetch';
// 过滤器
import * as custom from './filters/index';
// 全局过滤器
Object.keys(custom).map(key => {
  Vue.filter(key, custom[key]);
});
Vue.config.productionTip = false;

// 路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (tools.getItem('userInfo', 1)) { // 判断是否有userInfo
    if (!store.getters.token) { // 是否有写入store
      store.dispatch('GetUserInfo');
    }
    if (to.path === '/signin') {
      // 从首页进入的登陆成功后的页面返回时会持续加载
      if (from.path === '/home') {
        next();
      }
      next({ path: '/' });
    } else {
      next();
    }
  } else { // 如果没有userInfo就判断页面是否需要登录
    if (to.meta.role === 'login') { // 如果需要登录的，导入登录页
      next({ path: '/signin', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
  document.getElementById('app').scrollTop = 0;
});

// vue组件原型调用方法
Vue.prototype.$moment = moment;
Vue.prototype.$tools = tools;
Vue.prototype.$fetchGet = fetchGet;
Vue.prototype.$fetchPost = fetchPost;
Vue.prototype.$api = path;
Vue.prototype.$md5 = md5;

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
