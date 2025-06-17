//Axios请求返回的是一个promise对象，其中response.data对象是后端返回的真正数据
/* response = {
  data: {},         // 后端返回的实际数据（JSON/字符串等）
  status: 200,      // HTTP状态码
  headers: {...},   // 响应头
  config: {...},    // 请求配置
  request: {...}    // 请求对象
} */


import axios from 'axios';

//定义常量
const SELECT_REQUEST_SUBJECT_POST = "GET_POSTS";
const SELECT_REQUEST_SUBJECT_USER = "GET_USERS";

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
  console.log("传输并验证可能含管理员权限的本地令牌: ", token)
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


//(3)主页模块
export const getHomePost = () => {
  return service.post('/post/home')
  .then(response => response.data)
  .catch(error => {
    console.error("主页获取帖子失败", error)
    throw error
  })
}

//(4)控制台模块
//使用指标、数目和偏移量获取帖子
export const getAdminPanelPostStand = (order, limit, offset) => {
  return service.post('/stand/post',{
    subject: SELECT_REQUEST_SUBJECT_POST,
    order: order,
    limit: limit,
    offset: offset
  })
  .then(response => response.data)
  .catch(error => {
    console.error("以标准方式获取控制台处帖子失败", error)
    throw error
  })
}

//使用指标、数目和偏移量获取用户
export const getAdminPanelUserStand = (order, limit, offset) => {
  return service.post('/stand/user',{
    subject: SELECT_REQUEST_SUBJECT_USER,
    order: order,
    limit: limit,
    offset: offset
  })
  .then(response => response.data)
  .catch(error => {
    console.error("以标准方式获取控制台处帖子失败", error)
    throw error
  })
}

//风险方法
//获取所有帖子
export const getAllPost = () => {
  return service.post('/post/all')
  .then(response => response.data)
  .catch(error => {
    console.error("获取所有帖子失败", error)
    throw error
  })
}


//风险方法
//获取所有帖子
export const getAllUser = () => {
  return service.post('/user/all')
  .then(response => response.data)
  .catch(error => {
    console.error("获取所有用户失败", error)
    throw error
  })
}

//更新帖子状态
export const updatePostStatus = (postID, status) => {
  return service.post('/post/updateStatus',{
    postID: postID,
    status: status
  })
  .then(response => response.data)
  .catch(error => {
    console.error("更新帖子状态失败", error)
    throw error
  })
}

//更新用户状态
export const updateUserStatus = (userID, status) => {
  return service.post('/user/updateStatus',{
    userID: userID,
    status: status
  })
  .then(response => response.data)
  .catch(error => {
    console.error("更新用户状态失败", error)
    throw error
  })
}

//(5)个人主页模块
//更新用户状态
export const getPostByUserID = (userID) => {
  return service.post('/post/byUserID',{
    userID: userID
  })
  .then(response => response.data)
  .catch(error => {
    console.error("传输指定用户创建帖子的请求失败", error)
    throw error
  })
}

