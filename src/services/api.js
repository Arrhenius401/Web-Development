//Axios请求返回的是一个promise对象，其中response.data对象是后端返回的真正数据
/* response = {
  data: {},         // 后端返回的实际数据（JSON/字符串等）
  status: 200,      // HTTP状态码
  headers: {...},   // 响应头
  config: {...},    // 请求配置
  request: {...}    // 请求对象
} */


import axios from 'axios';


//创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8090/api', //设置基础URL（与后端服务地址一致）
  timeout: 5000 //请求超时时间
});


//定义API方法
//(0)验证模块
//验证本地令牌有效性
export const checkToken = (token) =>{
  //添加日志
  console.log("传输并验证本地令牌: ", token)
  return service.post('/checkToken',token)
  .then(response => response.data)
  .catch(error => {
    console.error("token验证失败: ", error)
    throw error
  })
}

//验证本地令牌是否有管理员权限
export const checkAdmin = (token) =>{
  //添加日志
  console.log("传输并验证本地令牌: ", token)
  return service.post('/checkAdmin',token)
  .then(response => response.data)
  .catch(error => {
    console.error("token验证失败: ", error)
    throw error
  })
}

//(1)登录模块
//用户使用邮箱登录
export const loginByEmail = (email, password) => {
  return service.post('/login/email',{
    email:email,
    password:password
  })
  .then(response => response.data)  //提取data
  .catch(error => {
    console.error("登录请求失败: ",error);
    throw error;  //继续抛出错误，让组件处理
  })
}

//用户使用电话号码登录
export const loginByPhoneNumber = (phoneNumber, password) => {
  return service.post('/login/phoneNumber',{
    phoneNumber:phoneNumber,
    password:password
  })
  .then(response => response.data)  //提取data
  .catch(error => {
    console.error("登录请求失败: ",error)
    throw error
  })
}


//(2)注册模块
//用户常规注册
export const registerDefaultUser = (username, email, phoneNumber, password) => {
  return service.post('/register/default',{
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    password: password
  })
  .then(response => response.data)
  .catch(error => {
    console.error("注册请求失败: ",error)
    throw error
  })
}


//(3)帖子模版
export const getHomePost = () => {
  return service.post('/post/home')
  .then(response => response.data)
  .catch(error => {
    console.error("主页获取帖子失败", error)
    throw error
  })
}


