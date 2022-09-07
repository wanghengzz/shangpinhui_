import { reqAddressInfo,reqOrderInfo } from '@/api/index.js'
const state = {
  address: [],
  orderInfo:{}
}
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
    state.address[0].isDefault='1'
  },
  GETORDERINFO(state,orderInfo){
    state.orderInfo=orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo()
    // console.log(result)
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取订单数据
  async getOrderInfo({commit}) {
    let result= await reqOrderInfo()
    // console.log(result);
    if(result.code==200){
      commit('GETORDERINFO',result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
