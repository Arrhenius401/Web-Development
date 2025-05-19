<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav v-if="$route.name !== 'Login'">
      <router-link to="/home">首页</router-link>
      <button @click="logout">退出登录</button>
    </nav>
    
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清除登录状态
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>