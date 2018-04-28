const getters = {
  loading: state => state.app.loading,
  token: state => state.user.token,
  userId: state => state.user.userId,
  username: state => state.user.username,
  headImgUrl: state => state.user.headImgUrl,
  mobile: state => state.user.mobile,
  currentGoods: state => state.cart.currentGoods
};
export default getters;
