import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Mall from '@/pages/Mall'
import MallIndex from '@/pages/MallIndex'
import GoodsList from '@/pages/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/mall',
      name: 'Mall',
      component: Mall,
      redirect:'/mall/index',
      children:[
        {
          path: '/mall/index',
          name: 'MallIndex',
          component: MallIndex
        },{
          path: '/mall/goodsList/:typeId/:keyword',
          name: 'GoodsList',
          component: GoodsList
        }
      ]
    }
  ]
})
