// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 添加 CSS 配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 引入 Tailwind CSS 配置文件
          require('tailwindcss')('./tailwind.config.js'),
          require('autoprefixer'), // 自动添加浏览器前缀
        ],
      },
    },
  },
})