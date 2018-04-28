import path from '@/api/api-path';
import { fetchPost } from '@/utils/fetch';
// 获取发票
function getInvoiceList() {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.INVOICE_LIST
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 添加发票
function addInvoice(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.ADD_INVOICE,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 修改收货地址
function updateInvoice(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.UPDATE_INVOICE,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
// 删除发票
function delInvoice(data) {
  return new Promise((resolve, reject) => {
    fetchPost({
      url: path.DEL_INVOICE,
      data: data
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

export {getInvoiceList, addInvoice, updateInvoice, delInvoice};
