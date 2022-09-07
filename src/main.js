import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav/index.vue'
// 轮播图引入
import Carsousel from '@/components/Carousel/index.vue'
// 分页器全局组件
import Pagniation from '@/components/Pagination/index.vue'
// 第一个参数:全局组件的名字 第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav)
// 全局组件轮播图
Vue.component(Carsousel.name,Carsousel)
// 分页器全局注册
Vue.component(Pagniation.name,Pagniation)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store/index.js'
// 引入mockServe.js----mock数据
import '@/mock/mockServe.js'
// 引入swiper的样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部的请求函数
import *as API from '@/api'

// Element UI注册组件的时候，挂在原型上
import { Button,MessageBox} from 'element-ui';
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import {reqGetSearchInfo} from '@/api/index.js'
console.log(reqGetSearchInfo())

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册插件
import atm from '@/assets/images/1.gif'
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading: atm
})
// vee-validate 表单验证区域
import VeeValidate from 'vee-validate'
//引入进来的是vee-valadiate提供信息提示【中文的】
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,//给VeeValidate插件提供【中文提示功能】
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
  },
  //注册：有五个字段：phone、code、password、password1、agree【将来用中文显示，别用英文】
  attributes: { // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus=this;

    // 将所有的api挂载到vue原型对象身上
    Vue.prototype.$API=API
  },
  router,
  // 注册仓库:组件实力的身上多了一个属性$store
  store
}).$mount('#app')
