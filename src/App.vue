<!-- 应用入口、全局布局、全局状态管理、全局组件注册、全局样式 -->

<template>
  <div id="app" class="font-sans">
    <!-- 此处可设计导航栏等全局组件 -->
    <!-- 路由出口 -->
    <router-view />
    <MobileNavigation/>
    
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

body {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
}
</style>

<script>
import MobileNavigation from './components/MobileNavigation.vue';

export default {
  name: 'APP',

  methods: {
    logout() {
      // 清除登录状态
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>