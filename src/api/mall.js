import axios from '../config/axios-client'

export function login(data){
  const res = axios.post('/api/user/login',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function signup(data){
  const res = axios.post('/api/user/sign',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getGoods(){
  const res = axios.get('/api/goods/goodsList');
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getGoodsInfo(data){
  const res = axios.get('/api/goods/'+data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getGoodsListByType(id){
  const res = axios.get('/api/goods/goodsList/'+id);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getGoodsTypeList(){
  const res = axios.get('admin/mall/city');
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getGoodsTypeListClient(){
  const res = axios.get('admin/mall/city/client');
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function insertGoodsTypeList(city_name){
  const res = axios.post('/admin/mall/city/add', city_name);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getGoodsListByName(name){
  const res = axios.post('/api/goods/goodsList/name/'+name);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getComment(id){
  const res = axios.get('/mall/comments/'+id);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function addComment(data){
  const res = axios.post('/mall/comments/add',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getCart(data){
  const res = axios.post('/mall/carts',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function deleteCart(data){
  const res = axios.post('/mall/cart/delete',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function addCart(data){
  const res = axios.post('/mall/cart/add',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getOrders(data){
  const res = axios.post('/mall/orders',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function deleteOrder(data){
  const res = axios.post('/mall/cart/delete',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function addOrders(data){
  const res = axios.post('/mall/order/add',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function myData(data){
  const res = axios.post('/mall/data',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function updateData(data){
  const res = axios.post('/mall/data/update',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function buy(data){
  const res = axios.post('/api/goods/hotGoodsList',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
export function getHotGoodsList(data){
  const res = axios.post('/api/goods/hotGoodsList',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.success === true){
          resolve(json.data);
        }else{
          reject(json.error.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
