// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)
import routes from './routes.js'
// 配置路由
// 引入store
import store from '@/store/index.js'
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    // 代表滚动条在最上方
    return { y: 0 }
  }
})

// 全局守卫：前置守卫（在路由跳转前进行判断）
router.beforeEach(async (to, from, next) => {
  // to 可以获取到你要跳转到哪个路由的信息
  // from 可以获取到你从哪个路由来的信息
  // next 放行函数 next（）放行   next（‘/login’）放行到指定的位置
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户已经登陆了,则无法去登录页只会停留在首页
    if (to.path == '/login') {
      next('/home')
    } else {
      // 用户已经登陆了,但是不去登录页则放行
      if (name) {
        // 登录去的不是login
        // 如果有用户信息直接放行
        next()
      } else {
        // 没有用户信息,派发action让仓库存储用户信息在跳转
        // 获取用户信息在首页展示
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了
          // 1.清除token
          await store.dispatch('userLogout')
          // 2.跳转到login
          next('/login');
        }
      }
    }
  } else {
    // 未登录,不能去交易相关   不能去支付相关的 pay paysuccess  不能去个人中心
    // 去登录页
    // 不去上面的其他的放行
    let toPath=to.path;
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      // 去登录页
      // 未登陆的时候想去而没有去成功的信息存储与路由中
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
})
export default router
