<template>
  <!-- 图片查看器模态框 -->
  <div 
    v-if="visible" 
    class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
    @click="close"
  >
    <div class="relative max-w-full max-h-full p-4" @click.stop>
      <!-- 关闭按钮 -->
      <button 
        @click="close"
        class="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <!-- 图片容器 -->
      <div class="relative">
        <img 
          :src="currentImage" 
          :alt="`图片 ${currentIndex + 1}`"
          class="max-w-full max-h-[80vh] object-contain rounded-lg"
          @load="onImageLoad"
          @error="onImageError"
        >
        
        <!-- 加载状态 -->
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
          <LoadingSpinner color="white" text="加载中..." />
        </div>
        
        <!-- 错误状态 -->
        <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
          <div class="text-center text-white">
            <svg class="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p>图片加载失败</p>
          </div>
        </div>
      </div>
      
      <!-- 多图片导航 -->
      <div v-if="images.length > 1" class="mt-4">
        <!-- 上一张/下一张按钮 -->
        <button 
          v-if="currentIndex > 0"
          @click="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          v-if="currentIndex < images.length - 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <!-- 缩略图导航 -->
        <div class="flex justify-center space-x-2 mt-4">
          <button 
            v-for="(image, index) in images" 
            :key="index"
            @click="currentIndex = index"
            :class="[
              'w-12 h-12 rounded-lg overflow-hidden border-2 transition-all',
              index === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-80'
            ]"
          >
            <img :src="image" :alt="`缩略图 ${index + 1}`" class="w-full h-full object-cover">
          </button>
        </div>
        
        <!-- 图片计数 -->
        <div class="text-center mt-2">
          <span class="text-white text-sm">{{ currentIndex + 1 }} / {{ images.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'ImageViewer',
  components: {
    LoadingSpinner
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentIndex: 0,
      loading: false,
      error: false
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex] || ''
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.currentIndex = this.initialIndex
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    currentIndex() {
      this.loading = true
      this.error = false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++
      }
    },
    onImageLoad() {
      this.loading = false
      this.error = false
    },
    onImageError() {
      this.loading = false
      this.error = true
    },
    handleKeydown(e) {
      if (!this.visible) return
      
      switch (e.key) {
        case 'Escape':
          this.close()
          break
        case 'ArrowLeft':
          this.previousImage()
          break
        case 'ArrowRight':
          this.nextImage()
          break
      }
    }
  },
  mounted() {
    // 键盘导航
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  }
}
</script>