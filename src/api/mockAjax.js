// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条的样式
import 'nprogress/nprogress.css'
// nProgress start方法：代表进度条开始 done：代表进度条开始

// 1.利用axios对象的方法create去创建一个axios实例
const requests=axios.create({
  // 配置对象
  // 基础路径，发送请求的时候路径中出现api
  // 这里时向mock发送请求
  baseURL:'/mock',
  // 代表请求超时的时间为5s
  timeout:5000,
})

//2 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些失去
requests.interceptors.request.use((config)=>{
  // config：配置对象，对象里面有一个属性很重要，header请求头
  // 进度条开始
  nProgress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
  // 响应成功的回调函数：服务器数据回来以后，响应拦截器可以检测到，可以做一些失去
  // 进度条结束
  nProgress.done()
  return res.data;
},()=>{
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'))
})


// 3 对外暴漏
export default requests;