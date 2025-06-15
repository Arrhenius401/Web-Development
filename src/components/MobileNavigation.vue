<template>
  <!-- 移动端底部导航栏 -->
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
    <div class="grid grid-cols-5 h-16">
      <router-link 
        to="/" 
        class="flex flex-col items-center justify-center space-y-1 text-xs transition-colors"
        :class="$route.path === '/' ? 'text-blue-600' : 'text-gray-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>首页</span>
      </router-link>
      
      <router-link 
        to="/products" 
        class="flex flex-col items-center justify-center space-y-1 text-xs transition-colors"
        :class="$route.path.startsWith('/product') ? 'text-blue-600' : 'text-gray-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        <span>商城</span>
      </router-link>
      
      <button 
        @click="$router.push('/post/create')"
        class="flex flex-col items-center justify-center space-y-1 text-xs text-blue-600"
      >
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <span>发布</span>
      </button>
      
      <router-link 
        to="/chat" 
        class="flex flex-col items-center justify-center space-y-1 text-xs transition-colors relative"
        :class="$route.path === '/chat' ? 'text-blue-600' : 'text-gray-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span>消息</span>
        <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          3
        </div>
      </router-link>
      
      <router-link 
        to="/profile" 
        class="flex flex-col items-center justify-center space-y-1 text-xs transition-colors"
        :class="$route.path === '/profile' ? 'text-blue-600' : 'text-gray-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <span>我的</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MobileNavigation'
}
</script>