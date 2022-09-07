import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api/index.js'
// home的小仓库
const state={
  // state默认数据
  categroyList:[],
  // 轮播图数据
  bannerList:[],
  // floor数据
  floorList:[],
};
const mutations={
  CATEGORYLIST(state,categroyList){
    state.categroyList=categroyList;
  },
  GETBANNER(state,bannerList){
    state.bannerList=bannerList
  },
  GETFLOOR(state,floorList){
      state.floorList=floorList
  }
};
const actions={
  // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
  async categroyList({commit}){
    // api中的发送请求函数
    let result=await reqCategoryList();
     if(result.code==200){
      commit('CATEGORYLIST',result.data)
     }
  },
  // 获取首页轮播图的数据
  async getBannerList({commit}){
    let result=await reqGetBannerList();
    // console.log(result)
    if(result.code==200){
      commit('GETBANNER',result.data)
    }
  },
  // 获取floor数据
  async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code==200){
          // 提交mutation
          commit('GETFLOOR',result.data)
        }
  }

};
// 计算属性
const getters={};
const modules={};
export default{
  state,
  mutations,
  actions,
  getters,
  modules
}
