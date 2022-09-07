// API接口进行统一管理
import requests from './request'
// mock模拟数据
import mockRequests from './mockAjax.js'

// 三级联动的接口
// 请求地址：/api/product/getBaseCategoryList  GET请求  无参数
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
// 发请求:axios发请求返回结果时promise对象

// 获取首页轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块属性/api/list 请求方式post
// 参数
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
export const reqGetSearchInfo = params => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息接口

export const reqGoodsInfo = skuId => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车（更新某一个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }   POST

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据的结构
// URL:/api/cart/cartList   GET
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车产品的接口 /api/cart/deleteCart/{skuId}   DELETE
export const reqDeleteCartById = skuId => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品选中状态的接口 /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码接口 /api/user/passport/sendCode/{phone} get
export const reqGetCode = phone => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册接口 /api/user/passport/register  post   phone code password
export const reqUserRegister = data => requests({ url: '/user/passport/register', data, method: 'post' })

// 登录接口 /api/user/passport/login  post     phone password
export const reqUserLogin = data => requests({ url: '/user/passport/login', method: 'post', data })

// 获取用户信息【需要带着用户的token向服务器要用户的信息】 /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录  /api/user/passport/logout
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息       /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList ', method: 'get' })

// 获取商品清单      /api/order/auth/trade   get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单信息    /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息    /api/payment/weixin/createNative/{orderId}    get
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId} `,method:'get'})
// 获取支付订单状态  /api/payment/weixin/createNative/{orderId}   get
export const reqPayStatues=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取个人中心的订单数据    /api/order/auth/{page}/{limit}   get
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})