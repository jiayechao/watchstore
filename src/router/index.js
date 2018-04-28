import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

export default new Router({
  // base指向
  base: '/watch-pc',
  // 使用history模式不会有#号
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/404', component: _import('404'), name: '404'},
    {
      path: '/', // 首页
      name: '首页',
      component: _import('index')
    },
    {
      path: '/signup', // 注册
      name: '注册',
      component: _import('login/signup')
    },
    {
      path: '/signin', // 登录
      name: '登录',
      component: _import('login/signin')
    },
    {
      path: '/forget', // 忘记密码
      name: '忘记密码',
      component: _import('login/forget')
    },
    {
      path: '/goods/:id', // 商品详情
      name: '商品详情',
      component: _import('goods/index')
    },
    {
      path: '/purchase',
      name: '商品购买',
      meta: {
        role: 'login'
      },
      component: _import('goods/purchase')
    },
    {
      path: '/pay/:orderId',
      name: '支付购买',
      meta: {
        role: 'login'
      },
      component: _import('goods/pay')
    },
    {
      path: '/pay_state',
      name: '支付状态',
      meta: {
        role: 'login'
      },
      component: _import('goods/payState')
    },
    {
      path: '/cart',
      name: '购物车',
      meta: {
        role: 'login'
      },
      component: _import('goods/cart')
    },
    {
      path: '/user/:userId',
      name: '用户',
      meta: {
        role: 'login'
      },
      redirect: '/user/:userId/info',
      component: _import('user/index'),
      children: [
        {
          path: 'info',
          name: '个人信息',
          meta: {
            role: 'login'
          },
          component: _import('user/components/info')
        },
        {
          path: 'address',
          name: '收货地址',
          meta: {
            role: 'login'
          },
          component: _import('user/components/address')
        },
        {
          path: 'order_list',
          name: '订单列表',
          meta: {
            role: 'login'
          },
          component: _import('user/components/order/index')
        },
        {
          path: 'order/:orderId',
          name: '订单详情',
          meta: {
            role: 'login'
          },
          component: _import('user/components/order/detail')
        },
        {
          path: 'service/:orderId',
          name: '退货',
          meta: {
            role: 'login'
          },
          component: _import('user/components/order/service')
        },
        {
          path: 'service_status/:orderId',
          name: '售后状态',
          meta: {
            role: 'login'
          },
          component: _import('user/components/order/accept')
        }
      ]
    },
    { path: '*', redirect: '/404' }
  ]
});
