import { reqGetSearchInfo } from '@/api'
// search的小仓库
const state = {
  // 服务器返回的是对象因此设置为对象
  searchList:{}
}
const mutations = {
  GETSEARCH(state,searchList){
       state.searchList=searchList
  }
}
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params={}) {
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
      if(result.code==200){
        commit('GETSEARCH',result.data)
      }
  }
}
// 计算属性：在项目中，为了简化数据而生
// 在项目中getters主要作用是简化仓库中的数组
// 把将来在组件当中需要用的数据简化，将来获取数组的时候方便
const getters = {
  // state是当前仓库中的state
  goodsList(state){
    // 如果网络不好请求服务器得不到数据就会返回undefined所以数据无效渲染，以防万一给返回一个空数组
      return state.searchList.goodsList||[];
  },
  trademarkList(state){
    return state.searchList.trademarkList||[]
  },
  attrsList(state){
    return state.searchList.attrsList||[]
  }
}
const modules = {}
export default {
  state,
  mutations,
  actions,
  getters,
  modules
}
