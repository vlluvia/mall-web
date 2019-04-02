import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Mall from '@/pages/Mall'
import MallIndex from '@/pages/MallIndex'
import GoodsList from '@/pages/GoodsList'
import GoodsDetail from '@/pages/GoodsDetail'
import MallContent from '@/pages/MallContent'
import PersonInfo from '@/pages/PersonInfo'
import Cart from '@/pages/Cart'
import Order from '@/pages/Order'
import Data from '@/pages/Data'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/mall"
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/mall',
      name: 'Mall',
      component: Mall,
      redirect: '/mall/s',
      children: [
        {
          path: 's',
          name: 'MallContent',
          component: MallContent,
          redirect: '/mall/s/index',
          children: [
            {
              path: 'index',
              name: 'MallIndex',
              component: MallIndex
            }, {
              path: '/mall/goodsList/:typeId/:keyword',
              name: 'GoodsList',
              component: GoodsList
            }
          ]
        }, {
          path: 'goods/:id',
          name: 'GoodsDetail',
          component: GoodsDetail
        }, {
          path: 'person',
          name: 'PersonInfo',
          component: PersonInfo,
          children: [
            {
              path: 'cart',
              name: 'Cart',
              component: Cart
            }, {
              path: 'order',
              name: 'Order',
              component: Order
            },{
              path: 'data',
              name: 'Data',
              component: Data
            }
          ]
        }
      ]
    }
  ]
})
