<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- 左侧：Logo + 搜索框 -->
          <div class="flex items-center flex-1">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-blue-600">社区</h1>
            </div>
            <div class="ml-8 flex-1 max-w-2xl">
              <div class="relative">
                <input
                  type="text"
                  placeholder="搜索帖子、话题..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  v-model="searchQuery"
                />
                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 右侧：用户信息 + 发帖按钮 -->
          <div class="flex items-center space-x-4">
            <button 
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              @click="$router.push('/postCreate')"
            >
              发帖
            </button>
            <div class="flex items-center space-x-2 cursor-pointer" @click="$router.push('/profile')">
              <img src="/placeholder.svg?height=32&width=32" alt="用户头像" class="w-8 h-8 rounded-full">
              <span class="text-gray-700">用户名</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <!-- 主内容区 -->
        <main class="flex-1">
          <!-- 筛选栏 -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex items-center justify-between">
              <div class="flex space-x-4">
                <button 
                  v-for="filter in filters" 
                  :key="filter.key"
                  :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === filter.key 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                  @click="activeFilter = filter.key"
                >
                  {{ filter.label }}
                </button>
              </div>
              <div class="flex space-x-2">
                <span 
                  v-for="tag in popularTags" 
                  :key="tag"
                  class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm cursor-pointer hover:bg-blue-100"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- 帖子列表 -->
          <div class="space-y-4">
            <div 
              v-for="post in posts" 
              :key="post.id"
              class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              @click="$router.push(`/post/${post.postID}`)"
            >
              <div class="flex items-start space-x-4">
                <img :src="post.avatar" alt="用户头像" class="w-10 h-10 rounded-full">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="font-medium text-gray-900">{{ post.username }}</span>
                    <span class="text-gray-500 text-sm">{{ post.time }}</span>
                    <span v-if="post.isHot" class="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">热门</span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ post.title }}</h3>
                  <p class="text-gray-600 mb-3 line-clamp-2">{{ post.summary }}</p>
                  <div class="flex items-center space-x-6 text-gray-500">
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      <span>{{ post.likeCount }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span>{{ post.commentCount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- 右侧悬浮栏 -->
        <aside class="w-80">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 class="font-semibold text-gray-900 mb-4">热门话题</h3>
            <div class="space-y-3">
              <div v-for="topic in hotTopics" :key="topic.name" class="flex items-center justify-between">
                <span class="text-gray-700">#{{ topic.name }}</span>
                <span class="text-sm text-gray-500">{{ topic.count }}讨论</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>
  </div>
</template>

<script>
//在 Vue 3 中，this.$set 已被移除，主要原因是组合式 API 中的响应式系统（如 ref 和 reactive）不再需要它
//ref和reactive均是用于创建一个响应式对象的函数，其值被包裹在一个带有.value 属性的对象中
//当这个值被修改时，任何依赖它的 DOM 或计算属性都会自动更新
import { reactive } from 'vue'
import { getHomePost } from '../services/api'

export default {
  name: 'UserHome',
  data() {
    return {
      searchQuery: '',
      activeFilter: 'hot',
      showBackToTop: false,
      filters: [
        { key: 'hot', label: '热度' },
        { key: 'time', label: '时间' },
        { key: 'featured', label: '精华' }
      ],
      popularTags: ['好物分享', '技术讨论', '生活日常'],
      posts: reactive([]),
      hotTopics: [
        { name: '前端开发', count: '1.2k' },
        { name: '美食推荐', count: '856' },
        { name: '旅行攻略', count: '743' }
      ]
    }
  },
  //Vue 的生命周期钩子(mounted、create等)是同步执行的，它们的主要目的是设置组件状态或初始化操作，而不是等待异步操作完成
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.fetchPosts() //组件搭载后获取帖子
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    //在JavaScript中
    //for...in 用于遍历对象的属性名，而非数组元素或其他类型的值，适用于普通对象
    //for...of 用于遍历可迭代对象的值，适用于数组、字符串等
    //处理数组时，除非你确实需要索引，否则应优先使用 for...of 或 map
    async fetchPosts(){
      try{
        this.posts = await getHomePost()
        this.posts = this.posts.map(post => ({
          ...post,
          summary: post.content.substring(0, 10) + '...',
          time: this.$formatTime(new Date(post.createTime)),
          avatar: null
        }));
      }catch(error){
        console.log("主页获取帖子出错: ", error)
        console.log(this.$formatTime);
      } 
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>