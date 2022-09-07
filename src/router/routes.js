// 路由配置信息
// 引入一级路由组件
// import Home from '@/pages/Home/index.vue'
import Search from '@/pages/search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center/index.vue'
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder/index.vue'
import groupOrder from '@/pages/Center/groupOrder/index.vue'

export default [
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children:[
      {
        path:'myorder',
        component:myOrder
      },
      {
        path:"grouporder",
        component:groupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter:(to,from,next)=>{
      if(from.path=='/trade'){
        next();
      }else{
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    name: 'trade',
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.path=='/shopcart'){
        next();
      }else{
        next(false)
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true },
    name: 'shopcart'
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true },
    name: 'addcartsuccess'
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: true }
  },
  {
    path: '/home',
    // 路由懒加载
    component: () =>import('@/pages/Home/index.vue'),
    meta: { show: true }
  },
  {
    path: '/search/:keyword',
    component: Search,
    meta: { show: true },
    name: 'search'
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  // 重定向
  {
    path: '/',
    redirect: '/home'
  }
]
