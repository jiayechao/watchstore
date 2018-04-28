import md5 from 'js-md5';
import tools from '@/utils/tools';
import path from '@/api/api-path';
import { fetchPost } from '@/utils/fetch';
// 个人信息
const user = {
  state: {
    userId: '',
    username: '',
    headImgUrl: '',
    mobile: '',
    token: ''
  },
  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_HEADIMGURL: (state, headImgUrl) => {
      state.headImgUrl = headImgUrl;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        let userInfo = tools.getItem('userInfo', 1);
        if (!userInfo) {
          fetchPost({
            url: path.GET_MY_BASE_INFO
          }).then(res => {
            const data = res.data;
            tools.setItem('userInfo', data, 1);
            commit('SET_TOKEN', data.token);
            commit('SET_MOBILE', data.mobile);
            commit('SET_HEADIMGURL', data.headImgUrl);
            commit('SET_USERNAME', data.username);
            commit('SET_USERID', data.userId);
            resolve();
          }).catch(error => {
            reject(error);
          });
        } else {
          commit('SET_TOKEN', userInfo.token);
          commit('SET_MOBILE', userInfo.mobile);
          commit('SET_HEADIMGURL', userInfo.headImgUrl);
          commit('SET_USERNAME', userInfo.username);
          commit('SET_USERID', userInfo.userId);
        }
      });
    },
    // 登录
    LoginByMobile({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userInfo.p = md5(userInfo.password);
        fetchPost({
          url: path.LOGIN,
          data: userInfo
        }).then(res => {
          const data = res.data;
          tools.setItem('userInfo', data, 1);
          commit('SET_TOKEN', data.token);
          commit('SET_MOBILE', data.mobile);
          commit('SET_HEADIMGURL', data.headImgUrl);
          commit('SET_USERNAME', data.username);
          commit('SET_USERID', data.userId);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        fetchPost({
          url: path.LOGIN_OUT
        }).then(res => {
          tools.removeItem('userInfo', true);
          commit('SET_TOKEN', '');
          commit('SET_MOBILE', '');
          commit('SET_HEADIMGURL', '');
          commit('SET_USERNAME', '');
          commit('SET_USERID', '');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        tools.removeItem('userInfo', true);
        commit('SET_TOKEN', '');
        commit('SET_MOBILE', '');
        commit('SET_HEADIMGURL', '');
        commit('SET_USERNAME', '');
        commit('SET_USERID', '');
        resolve();
      });
    }
  }
};
export default user;
