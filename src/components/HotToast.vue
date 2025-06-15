<template>
  <transition-group 
    name="toast" 
    tag="div" 
    class="fixed top-4 right-4 z-50 space-y-2"
  >
    <div 
      v-for="toast in toasts" 
      :key="toast.id"
      :class="[
        'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
        getToastClass(toast.type)
      ]"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- 成功图标 -->
            <svg 
              v-if="toast.type === 'success'" 
              class="h-6 w-6 text-green-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- 错误图标 -->
            <svg 
              v-else-if="toast.type === 'error'" 
              class="h-6 w-6 text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- 警告图标 -->
            <svg 
              v-else-if="toast.type === 'warning'" 
              class="h-6 w-6 text-yellow-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            
            <!-- 信息图标 -->
            <svg 
              v-else 
              class="h-6 w-6 text-blue-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{{ toast.title }}</p>
            <p v-if="toast.message" class="mt-1 text-sm text-gray-500">{{ toast.message }}</p>
          </div>
          
          <div class="ml-4 flex-shrink-0 flex">
            <button 
              @click="removeToast(toast.id)"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">关闭</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'HotToast',
  data() {
    return {
      toasts: []
    }
  },
  methods: {
    addToast(toast) {
      const id = Date.now() + Math.random()
      const newToast = {
        id,
        type: toast.type || 'info',
        title: toast.title || '',
        message: toast.message || '',
        duration: toast.duration || 3000
      }
      
      this.toasts.push(newToast)
      
      // 自动移除
      if (newToast.duration > 0) {
        setTimeout(() => {
          this.removeToast(id)
        }, newToast.duration)
      }
    },
    removeToast(id) {
      const index = this.toasts.findIndex(toast => toast.id === id)
      if (index > -1) {
        this.toasts.splice(index, 1)
      }
    },
    getToastClass(type) {
      const classes = {
        success: 'border-l-4 border-green-400',
        error: 'border-l-4 border-red-400',
        warning: 'border-l-4 border-yellow-400',
        info: 'border-l-4 border-blue-400'
      }
      return classes[type] || classes.info
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>