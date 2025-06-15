import { createRouter, createWebHistory } from 'vue-router';

import UserHome from '../views/UserHome.vue';
import UserLogin from '../views/UserLogin.vue';
import UserProfile from '../views/UserProfile.vue';
import UserChat from '../views/UserChat.vue';
import UserRegister from '../views/UserRegister.vue';
import UserForgotPassword from '../views/UserForgotPassword.vue';

import PostDetail from '../views/PostDetail.vue';
import PostCreate from '../views/PostCreate.vue';

import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';

import OrderDetail from '../views/OrderDetail.vue';
import OrderConfirm from '../views/OrderConfirm.vue';
import OrderPayment from '../views/OrderPayment.vue';

import AdminPanel from '../views/AdminPanel.vue';

import { checkAdmin, checkToken } from '../services/api';

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: UserHome,
    meta:{
      title: '主页 - Graygoo的web'
    }
  },{
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
    meta:{
      requiresGuest: true,
      title: '登录 - Graygoo的web'
    }
  },{
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { 
      requiresAuth: true,
      title: '个人资料 - Graygoo的web'
    }
  },{
    path: '/userChat',
    name: 'UserChat',
    component: UserChat,
    meta: { 
      requiresAuth: true,
      title: '消息 - Graygoo的web'
    }
  },{
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
    meta:{
      requiresGuest: true,
      title: '注册 - Graygoo的web'
    }
  },{
    path: '/forgetPassword',
    name: 'UserForgetPassword',
    component: UserForgotPassword,
    meta:{
      requiresGuest: true,
      title: '找回密码 - Graygoo的web'
    }
  },{
    path: '/postDetail/:id',
    name: 'PostDetail',
    component: PostDetail,
    meta:{
      title: '帖子详情 - Graygoo的web'
    }
  },{
    path: '/postCreate',
    name: 'PostCreate',
    component: PostCreate,
    meta:{
      title: '发布帖子 - Graygoo的web'
    }
  },{
    path: '/productList',
    name: 'ProductList',
    component: ProductList,
    meta:{
      title: '商品列表 - Graygoo的web'
    }
  },{
    path: '/productDetail/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta:{
      title: '商品详情 - Graygoo的web'
    }
  },{
    path: '/orderDetail/:id',
    name: 'OrderDetail',
    component: OrderDetail,
    meta:{
      requiresAuth: true,
      title: '订单详情 - Graygoo的web'
    }
  },{
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: OrderConfirm,
    meta: { 
      requiresAuth: true,
      title: '订单确认 - Graygoo的web'
    }
  },{
    path: '/orderPayment',
    name: 'OrderPayment',
    component: OrderPayment,
    meta: { 
      requiresAuth: true,
      title: '支付 - Graygoo的web'
    }
  },{
    path: '/adminPanel',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { 
      requiresAuth: true,
      requiresAdmin: true,
      title: '控制台 - Graygoo的web'
    }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

//全局前置守卫（Global Before Guards），用于在路由切换前执行功能，常用于权限验证
//=> 在 JavaScript 中既不是赋值也不是遍历，而是 箭头函数（Arrow Function）的语法标志
//它是 ES6（ES2015）引入的一种简洁的函数定义方式，常用于简化回调函数或匿名函数的写法。
//它定义了简洁的函数。箭头前是函数的参数，箭头后是函数的返回值
router.beforeEach(async (to, from, next) => {
  //用户认证状态
  let isAuthenticated

  //还原本地token
  let localToken = JSON.parse(window.localStorage.getItem('local-token'))
  if(!localToken){
    isAuthenticated = false
  }else{
    isAuthenticated = await checkToken(localToken)
  }

  if(isAuthenticated != true && isAuthenticated != false){
    isAuthenticated = false
  }

  console.log("跳转界面中,认证状态: ", isAuthenticated)

  //检查已登录用户访问登录/注册界面
  if(to.meta.requiresGuest && isAuthenticated){
    //清除令牌
    window.localStorage.removeItem('local-token')
    next()
    return
  }
  
  //检查需要登录的界面
  if(to.meta.requiresAuth && !isAuthenticated){
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  //检查需要管理员权限的界面
  if(to.meta.requiresAdmin){
    let isAdmin = await checkAdmin(localToken)
    console.log("管理身份认证状态: ", isAdmin)
    if(!isAdmin){
      return
    }
  }

  next()
});

//全局前置守卫（Global After Guards），用于在路由切换后执行功能，常用于设置标题
router.afterEach((to) => {
  //设置页面标题
  if(to.meta.title){
    document.title = to.meta.title
  }else{
    document.title = 'graygoo的web'
  }
});

export default router;