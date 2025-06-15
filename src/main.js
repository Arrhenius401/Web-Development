import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由
import './index.css';

//基础: 创建应用实例
const app = createApp(App);

//基础: 配置应用
app.config.productionTip = false; 


//全局错误处理
app.config.errorHandler = (err, vm, info) => {
    console.error('出现全局错误: ', err, info)
}

//全局属性
//全局过滤器函数$formatTime
app.config.globalProperties.$formatTime = function(time){
    //检查time是否是Date类型对象
    if(!(time instanceof Date)){
        return "";
    }

    const now =new Date()
    const diff = now - time
    const minutes = Math.floor(diff / (1000 *60))   //Math.floor向下取整
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 *60 * 24))

    if(minutes < 1) return '刚刚'
    if(minutes < 60) return `${minutes}分钟前`
    if(hours < 24) return `${hours}小时前`
    if(days < 7) return `${days}天前`
    
    return time.toLocaleDateString()    //time是Date类型数据
}

//定义人民币的标准货币格式
app.config.globalProperties.$formatePrice = function(price){
    return new Intl.NumberFormat('zh-CN', { //指定语言环境为中文
        style: 'currency',  //指定格式化为货币
        currency: 'CNY'     //指定货币类型为人民币
    }).format(price)

}



//基础: 使用插件
app.use(router);

//基础: 挂载应用
app.mount('#app');