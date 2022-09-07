import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index.js'
// 封装游客身份模块uuid---》生成一个随机的字符串
import {getUUID} from '@/utils/uuid_token.js'
const state={
  goodInfo:{},
  // 游客的临时身份
  uuid_token:getUUID()
}
const mutations={
  GETGOODINFO(state,goodInfo){
    state.goodInfo=goodInfo
  }
}
const actions={
  // 获取产品信息的action
 async getGoodInfo({commit},skuId){
      let result= await reqGoodsInfo(skuId)
      if(result.code==200){
        commit('GETGOODINFO',result.data)
      }
  },
  // 将产品添加到购物车中
  async AddOrUpdateShopCart({commit},{skuId,skuNum}){
      let result=await reqAddOrUpdateShopCart(skuId,skuNum)
      // 加入购物车返回的解构
      // 加入购物车以后（发请求），前台将带参数给服务器
      // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
      // 因为服务器没有返回其余的数据，因此不需要三连环
      // 加入购物车成功
      if(result.code==200){
        return 'ok'
      }else{
        // 加入购物车失败
        return Promise.reject(new Error('faile'))
      }
    //  当前函数的返回值是一个promise
  }
}
// 简化数据
const getters={
  categoryView(){
    // 如果服务器有则返回 如果没有则返回空对象
   return state.goodInfo.categoryView||{}
  },
  // 产品信息的数据
  skuInfo(){
    return state.goodInfo.skuInfo||{}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(){
    return state.goodInfo.spuSaleAttrList||[]
  }

}
export default{
  state,
  mutations,
  actions,
  getters
}