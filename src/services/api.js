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
    console.error("登录请求失败: ",error);
    throw error;  //继续抛出错误，让组件处理
  })
}


//(2)注册模块
//用户在"/register"界面注册
export const registerDefaultUser = (username, email, phoneNumber, password) => {
  return service.post('/register/default',{
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    password: password
  })
  .then(response => response.data)
  .catch(error => {
    console.error("注册请求失败: ",error);
    throw error;
  })
}


