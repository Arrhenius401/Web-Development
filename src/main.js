// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由
import './index.css';

// 创建应用实例
const app = createApp(App);

// 配置应用
app.config.productionTip = false; 

// 使用插件
app.use(router);

// 挂载应用
app.mount('#app');