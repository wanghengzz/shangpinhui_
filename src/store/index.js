import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)
// 引入home小仓库
import home from './home/index.js'
// 引入search小仓库
import search from './search/index.js'
// 引入detail小仓库
import detail from './detail/index.js'
// 引入shopCatr小仓库
import shopcart from './shopcart/index.js'
// 引入user小仓库
import user from './user.js/index.js'
// 引入trade小仓库
import trade from './trade/trade.js'

export default new Vuex.Store({
  // 实现vuex仓库模块式开发存储数据
    modules:{
      home,
      search,
      detail,
      shopcart,
      user,
      trade
    }

})