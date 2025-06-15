<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- 主要加载动画 -->
      <div 
        :class="[
          'animate-spin rounded-full border-solid border-t-transparent',
          sizeClass,
          colorClass
        ]"
      ></div>
      
      <!-- 内部小圆点 -->
      <div 
        v-if="showDots"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="flex space-x-1">
          <div 
            v-for="i in 3" 
            :key="i"
            class="w-1 h-1 bg-current rounded-full animate-pulse"
            :style="{ animationDelay: `${i * 0.2}s` }"
          ></div>
        </div>
      </div>
    </div>
    
    <!-- 加载文本 -->
    <span v-if="text" class="ml-3 text-sm" :class="textColorClass">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'gray', 'white'].includes(value)
    },
    text: {
      type: String,
      default: ''
    },
    showDots: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    containerClass() {
      return this.fullScreen ? 'fixed inset-0 bg-white bg-opacity-75 z-50' : 'py-4'
    },
    sizeClass() {
      const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-2',
        xl: 'w-12 h-12 border-4'
      }
      return sizes[this.size]
    },
    colorClass() {
      const colors = {
        blue: 'border-blue-200 border-t-blue-600',
        gray: 'border-gray-200 border-t-gray-600',
        white: 'border-white border-opacity-30 border-t-white'
      }
      return colors[this.color]
    },
    textColorClass() {
      const colors = {
        blue: 'text-blue-600',
        gray: 'text-gray-600',
        white: 'text-white'
      }
      return colors[this.color]
    }
  }
}
</script>