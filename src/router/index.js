import { createRouter, createWebHistory } from 'vue-router';
import UserHome from '../components/UserHome.vue';
import UserLogin from '../components/UserLogin.vue';
import UserProfile from '../components/UserProfile.vue';
import UserChat from '../components/UserChat.vue';
import UserRegister from '../components/UserRegister.vue';
import UserForgotPassword from '../components/UserForgotPassword.vue';

import PostDetail from '../components/PostDetail.vue';
import PostCreate from '../components/PostCreate.vue';

import ProductList from '../components/ProductList.vue';
import ProductDetail from '../components/ProductDetail.vue';

import OrderDetail from '../components/OrderDetail.vue';
import OrderConfirm from '../components/OrderConfirm.vue';
import OrderPayment from '../components/OrderPayment.vue';

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: UserHome,
  },{
    path: '/Login',
    name: 'UserLogin',
    component: UserLogin
  },{
    path: '/userProfile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },{
    path: '/userChat',
    name: 'UserChat',
    component: UserChat,
    meta: { requiresAuth: true }
  },{
    path: '/Register',
    name: 'UserRegister',
    component: UserRegister
  },{
    path: '/forgetPassword',
    name: 'UserForgetPassword',
    component: UserForgotPassword
  },{
    path: '/postDetail',
    name: 'PostDetail',
    component: PostDetail
  },{
    path: '/postCreate',
    name: 'PostCreate',
    component: PostCreate
  },{
    path: '/productList',
    name: 'ProductList',
    component: ProductList
  },{
    path: '/productDetail',
    name: 'ProductDetail',
    component: ProductDetail
  },{
    path: '/orderDetail',
    name: 'OrderDetail',
    component: OrderDetail
  },{
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: OrderConfirm,
    meta: { requiresAuth: true }
  },{
    path: '/orderPayment',
    name: 'OrderPayment',
    component: OrderPayment,
    meta: { requiresAuth: true }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫逻辑保持不变
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;