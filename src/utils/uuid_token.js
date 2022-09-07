import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机的字符串且每次执行不能发生变化，游客身份持久存储
export const getUUID=()=>{
  // 先从本地租出获取uuid（看一下本地存储是否有）
  let uuid_token=localStorage.getItem('UUIDTOKEN')
  // 如果本地没有uuid
  if(!uuid_token){
    // 生成临时游客的身份
    uuid_token=uuidv4();
    // 本地存储存储一次
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token;
    
}
