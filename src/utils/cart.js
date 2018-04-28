import path from '@/api/api-path';
import { fetchPost } from '@/utils/fetch';

// 获取购物车
function getCart() {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.GET_USER_CART
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 添加购物车
function addCart(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.ADD_CARD,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 修改购物车数量UPDATE_CART_NUM
function updateCartNum(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.UPDATE_CART_NUM,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 删除购物车
function delCart(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.DEL_CART,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
export {getCart, addCart, updateCartNum, delCart};
