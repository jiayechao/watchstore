import path from '@/api/api-path';
import { fetchPost } from '@/utils/fetch';
// 获取收货地址
function getAddressList() {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.ADDRESS_LIST,
      data: {
        page: 1,
        pageSize: 100
      }
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 添加收货地址
function addAddress(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.ADD_ADDRESS,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 修改收货地址
function updateAddress(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.UPDATE_ADDRESS,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 删除收货地址
function delAddress(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.DEL_ADDRESS,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 设置默认地址
function resetDefaultAddress(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.RESET_DEFAULT_ADDRESS,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

export {getAddressList, addAddress, updateAddress, delAddress, resetDefaultAddress};
