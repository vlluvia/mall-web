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
import Admin from '@/pages/admin/Admin'
import Mall_Admin from '@/pages/admin/Mall-Admin'
import Goods_Admin from '@/pages/admin/Goods'
import Orders_Admin from '@/pages/admin/Orders'
import Users_Admin from '@/pages/admin/Users'
import Comments_Admin from '@/pages/admin/Comments'
import GoodsList_Admin from '@/pages/admin/GoodsList'
import GoodsAddEdit_Admin from '@/pages/admin/GoodsAddEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/mall/s"
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/adminLogin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/mall-admin',
      name: 'Mall-Admin',
      component: Mall_Admin,
      redirect: '/mall-admin/goods',
      children: [
        {
          path: 'goods',
          name: 'Goods_Admin',
          component: Goods_Admin,
          redirect: '/mall-admin/goods/goodsList/1/all',
          children: [
            {
              path: 'goodsList/:typeId/:keyword',
              name: 'GoodsList_Admin',
              component: GoodsList_Admin
            }
          ],
        },{
          path: 'goods/:goodsId',
          name: 'GoodsAddEdit_Admin',
          component: GoodsAddEdit_Admin
        }, {
          path: 'comments',
          name: 'Comments_Admin',
          component: Comments_Admin
        }, {
          path: 'orders',
          name: 'Orders_Admin',
          component: Orders_Admin
        }, {
          path: 'users',
          name: 'Users_Admin',
          component: Users_Admin
        }
      ]
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
            }, {
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
