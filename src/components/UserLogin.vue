<template>
  <div>
    <h2>登录</h2>
    <form>
      <label>账号</label>
      <input v-model="username" type="text" />
      <label>密码</label>
      <input v-model="password" type="password" />
      <button @click.prevent="login">登录</button>
      <button @click.prevent="register">注册</button>
      <div class="bg-blue-500 text-white p-4">测试 Tailwind</div>
    </form>
  </div>
</template>

<style scoped>
/* 容器样式 */
div {
  @apply max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-xl;
}

/* 标题样式 */
h2 {
  @apply text-2xl font-bold text-center mb-6 text-gray-800;
}

/* 表单样式 */
form {
  @apply space-y-4;
}

/* 标签样式 */
label {
  @apply block text-sm font-medium text-gray-700;
}

/* 输入框样式 */
input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200;
}

/* 按钮样式 */
button {
  @apply w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50;
}

/* 登录按钮 */
button:first-of-type {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400;
}

/* 注册按钮 */
button:last-of-type {
  @apply bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 focus:ring-blue-300;
}
</style>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '123456') {
        this.$router.push('/home');
      } else {
        alert('账号或密码错误');
      }
    },
    register() {
      this.$router.push('/register');
    }
  }
};
</script>