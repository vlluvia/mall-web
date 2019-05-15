import axios from '../config/axios-client'

function basePost(url, data) {
  const res = axios.post(url, data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.success === true) {
          resolve(json.data);
        } else {
          reject(json.error.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

function baseGet(url) {
  const res = axios.get(url);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.success === true) {
          resolve(json.data);
        } else {
          reject(json.error.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

export function adminOrderLists(id, pageNum, pageSize) {
  return baseGet("/admin/orders?id=" + id + "&pageNum=" + pageNum + "&pageSize=" + pageSize);
}

export function deliverOrderGoods(data) {
  return basePost("/admin/deliver/goods", data);
}

export function getComments(pageNum, pageSize) {
  return baseGet("/admin/comment?pageNum=" + pageNum + "&pageSize=" + pageSize);
}

export function delComment(data) {
  return basePost("/admin/del/comment", data);
}

export function getUsers(pageNum, pageSize) {
  return baseGet("/admin/users?pageNum=" + pageNum + "&pageSize=" + pageSize);
}

export function deleteUser(data) {
  return basePost("/admin/del/user", data);
}
export function delGoods(data){
  return baseGet("/api/goods/del/"+data)
}
export function addGoods(data){
  return basePost("/api/goods/add",data);
}

export function getAdminGoods(data){
  return baseGet("/api/admin/goods/"+data)
}
