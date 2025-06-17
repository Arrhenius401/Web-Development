<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-xl font-bold text-blue-600">个人中心</h1>
          <button @click="$router.push('/')" class="text-gray-600 hover:text-gray-900">
            返回首页
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 顶部卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex items-start space-x-6">
          <div class="relative">
            <img :src="user.avatar" alt="用户头像" class="w-24 h-24 rounded-full">
            <button class="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
          </div>
          
          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-2xl font-bold text-gray-900">{{ user.username }}</h2>
              <button class="p-2 text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>
            </div>
            
            <p class="text-gray-600 mb-4">{{ user.bio }}</p>
            
            <div class="flex items-center space-x-6 text-sm text-gray-500">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>{{ user.postCount }} 篇帖子</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <span>信用分：{{ user.creditScore }}</span>
              </div>
              <button class="text-blue-600 hover:text-blue-700">
                交易记录
              </button>
            </div>
            
            <div v-if="user.creditScore < 80" class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-center space-x-2 text-yellow-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <span class="text-sm">信用分不足，需提升信用后可发布商品</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能模块 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 我的帖子 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">我的帖子</h3>
                <div class="flex space-x-2">
                  <button 
                    v-for="tab in postTabs" 
                    :key="tab.key"
                    :class="[
                      'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                      activePostTab === tab.key 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                    @click="activePostTab = tab.key"
                  >
                    {{ tab.label }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="post in myPosts" :key="post.id" class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-medium text-gray-900 mb-2">{{ post.title }}</h4>
                      <p class="text-gray-600 text-sm mb-2">{{ post.summary }}</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{{ post.publishTime }}</span>
                        <span>{{ post.likes }} 点赞</span>
                        <span>{{ post.comments }} 评论</span>
                      </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                      <button class="text-blue-600 hover:text-blue-700 text-sm">编辑</button>
                      <button class="text-red-600 hover:text-red-700 text-sm">删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="space-y-6">
          <!-- 我的收藏 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">我的收藏</h3>
            <div class="space-y-3">
              <div v-for="category in collectCategories" :key="category.name" class="flex items-center justify-between">
                <span class="text-gray-700">{{ category.name }}</span>
                <span class="text-sm text-gray-500">{{ category.count }}</span>
              </div>
            </div>
            <button class="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm">
              管理收藏
            </button>
          </div>

          <!-- 安全中心 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">安全中心</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-700">二次验证</span>
                <button class="text-blue-600 hover:text-blue-700 text-sm">设置</button>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">登录日志</span>
                <button class="text-blue-600 hover:text-blue-700 text-sm">查看</button>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">异地登录提醒</span>
                <div class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                </div>
              </div>
            </div>
          </div>

          <!-- 控制台 -->
          <!-- 仅当用户拥有管理员权限时可见 -->
          <div v-if="isAdmin" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">管理权限</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-700">控制台</span>
                <button @click="$router.push('/adminPanel')" class="text-blue-600 hover:text-blue-700 text-sm">进入</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkAdmin, getPostByUserID } from '../services/api';

export default {
  name: 'UserProfile',
  data() {
    return {
      isAdmin: false,
      activePostTab: 'all',

      //默认用户信息
      user: {
        username: '用户',
        avatar: '/placeholder.svg?height=96&width=96',
        bio: '默认用户简介',
        postCount: 0,
        creditScore: 100
      },
      postTabs: [
        { key: 'all', label: '全部' },
        { key: 'published', label: '已发布' },
        { key: 'draft', label: '草稿' }
      ],
      myPosts: [
        {
          id: 1,
          title: '分享一个超好用的编程工具',
          summary: '最近发现了一个非常好用的代码编辑器插件...',
          publishTime: '2天前',
          likes: 128,
          comments: 45
        },
        {
          id: 2,
          title: 'Vue 3 开发心得分享',
          summary: '使用Vue 3开发项目的一些经验和技巧...',
          publishTime: '1周前',
          likes: 89,
          comments: 23
        }
      ],
      collectCategories: [
        { name: '待阅读', count: 12 },
        { name: '兴趣话题', count: 8 },
        { name: '技术文章', count: 15 }
      ]
    }
  },mounted() {
    this.checkAdmin_profile()
    this.getUserFromToken()
    this.getMyPost(this.user.userID)
  },
  methods: {
    //前端方法的命名要谨慎
    //若使用checkAdmin()作为名称，则调用此名称时，方法将指向api.js中的checkAdmin()方法
    //仅在名称前加入"this."后，方法才指向本文件的checkAdmin()方法
    async checkAdmin_profile(){
      try{
        const localToken = JSON.parse(window.localStorage.getItem('local-token'))
        console.log("profile界面所传输token: ", localToken)
        this.isAdmin = await checkAdmin(localToken)
        console.log("管理身份认证状态: ", this.isAdmin)
      }catch(error){
        console.log("管理身份认证失败")
      }
    },
    async getUserFromToken(){
      //还原本地token
      let localToken = JSON.parse(window.localStorage.getItem('local-token'))
      this.user = localToken.user
    },
    async getMyPost(userID){
      console.log("userID: ", userID)
      try{
        this.myPosts = await getPostByUserID(userID)
      }catch(error){
        console.log("获取本机用户创建帖子的请求失败: ", error)
      }
      
    }
  }
}
</script>