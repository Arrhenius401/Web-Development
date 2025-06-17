<!-- 应用入口、全局布局、全局状态管理、全局组件注册、全局样式 -->

<template>
  <div id="app" class="font-sans">
    <!-- 此处可设计导航栏等全局组件 -->
    <!-- 路由出口 -->
    <router-view />
    <MobileNavigation/>
    <Toast ref="toast"/>
    <ImageViewer
      :visible="imageViewerVisible"
      :images="imageViewerImages"
      :initial-index="imageViewIndex"
      @close="closeImageViewer"
      />
  </div>
</template>

<script>
import MobileNavigation from './components/MobileNavigation.vue';
import Toast from './components/HotToast.vue'
import ImageViewer from './components/ImageViewer.vue';


export default {
  name: 'APP',
  components: {
    MobileNavigation,
    Toast,
    ImageViewer
  },
  data(){
    return{
      imageViewerVisible: false,
      imageViewerImages: [],
      imageViewIndex: 0
    }
  },
  methods: {
    logout() {
      // 清除登录状态
      localStorage.removeItem('local-token');
      this.$router.push('/login');
    },
    showToast(toast){
      //this.$refs.toast 指向当前组件中通过 ref="toast" 绑定的子组件
      //addToast(toast) 是子组件 Toast 内部定义的方法，用于创建并显示一个通知
      this.$refs.toast.addToast(toast)  
    },
    showImageViewer(images, index = 0){
      this.imageViewerImages = images
      this.imageViewIndex = index
      this.imageViewerVisible = true
    },
    closeImageViewer(){
      this.imageViewerVisible = false
    }
  },
  //提供全局可用的方法
  provide(){  
    return{
      showToast: this.showToast,
      showImageViewer: this.showImageViewer
    }
  }
}
</script>


<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  padding-bottom: 4rem; /* 为移动端底部导航留出空间 */
}

@media (min-width: 768px) {
  body {
    padding-bottom: 0;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>