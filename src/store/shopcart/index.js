import { reqCartList, reqDeleteCartById,reqUpdateCheckedById} from '@/api/index.js'
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartList({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车产品状态
  async updateCheckedById({commit},{skuId,isChecked}){
    let result=await reqUpdateCheckedById(skuId,isChecked)
    if(result.code==200){
       return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }

  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({dispatch,getters}){
      // context:小仓库 commit（提交mutation修改state）  getters（计算属性） dispatch（派发action）  state（当前仓库数据）\
      // 获取购物车当中全部的属性
      let PromiseAll=[];
      getters.cartList.cartInfoList.forEach(item=>{
      let promise=item.isChecked==1? dispatch('deleteCartList',item.skuId):'';
      //  将每一次返回的数组添加到PromiseAll中
      PromiseAll.push(promise)
      })
      // 只要全部的都成功 返回结果为成功 如果有一个失败返回的就是失败的结果
      return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartChecked({dispatch,getters},isChecked){
    let promiseAll=[]
     state.cartList[0].cartInfoList.forEach(item=>{
      let promise= dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
     })
     return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
  // 计算出来的购物车数据
  // cartInfoList(state){
  //    return state.
  // }
}
export default {
  state,
  mutations,
  actions,
  getters
}
