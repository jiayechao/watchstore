// import path from '@/api/api-path';
// import { fetchPost } from '@/utils/fetch';
const cart = {
  state: {
    currentGoods: []
  },
  mutations: {
    ADD_CURRENT_GOODS: (state, goods) => {
      state.currentGoods = goods;
    }
  }
  // actions: {
  //   // 立即购买
  //   BuyNow({ commit }, goods) {
  //     return new Promise((resolve, reject) => {
  //       fetchPost({
  //         url: path.DIRECT_ORDER,
  //         data: goods
  //       }).then(res => {
  //         const data = res.data;
  //         console.log('立即购买', data);
  //         commit('ADD_CURRENT_GOODS', data);
  //         resolve();
  //       }).catch(error => {
  //         reject(error);
  //       });
  //     });
  //   }
  // }
};
export default cart;
