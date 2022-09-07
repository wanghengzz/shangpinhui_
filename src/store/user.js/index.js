// 登陆与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index.js'
import { setToken } from '@/utils/token.js'
import { getToken } from '@/utils/token.js'
import { removeToken } from '@/utils/token.js'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state){
     state.token='',
     state.userInfo={},
     removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的接口是返回了验证码，正常应该是验证码发给用户手机
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    // console.log(result);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登陆页面[token]
  async reqUserLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    //  服务器下发的token，某一个用户的唯一标识符
    // 将来经常用带token找服务器要用户信息进行展示
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    //  console.log(result);
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({commit}) {
    // 只是向服务器发送请求，通知服务器清除token
    let result = await reqLogout()
    // 提交mutation修改state
    if(result.code==200){
      commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    
  }
}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}
