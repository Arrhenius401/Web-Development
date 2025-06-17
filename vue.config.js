// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 添加 CSS 配置
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('@tailwindcss/postcss7-compat'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },

  // 添加开发服务器配置
  devServer:{
    port:8070,  //前端端口
    proxy:{
      // 代理所有以 "/api" 开头的请求到后端服务器
      'api' :{
        target: 'http://localhost:8090',  //后端端口
        changeOrigin: true, //允许跨域
        pathRewrite:{
          '^/api':''  //重写路径，去掉路径中的 '/api'前缀
        }
      }
    }
  }
})

