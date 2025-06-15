<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo和导航 -->
          <div class="flex items-center space-x-8">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-blue-600">社区交易</h1>
            </div>
            <nav class="hidden md:flex space-x-6">
              <a href="#" class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">首页</a>
              <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">社区</a>
              <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors" @click="$router.push('/products')">商城</a>
              <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">活动</a>
            </nav>
          </div>

          <!-- 搜索框 -->
          <div class="flex-1 max-w-lg mx-8 hidden md:block">
            <div class="relative">
              <input 
                type="text" 
                placeholder="搜索帖子、商品、用户..."
                v-model="searchQuery"
                @keyup.enter="performSearch"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- 用户操作 -->
          <div class="flex items-center space-x-4">
            <button 
              @click="$router.push('/post/create')"
              class="hidden md:flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              发布
            </button>
            
            <!-- 消息通知 -->
            <button class="relative p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 3H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5"></path>
              </svg>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>

            <!-- 用户头像 -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="/placeholder.svg?height=32&width=32" alt="用户头像" class="w-8 h-8 rounded-full">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- 用户菜单 -->
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <a href="#" @click="$router.push('/profile')" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">个人资料</a>
                <a href="#" @click="$router.push('/chat')" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">我的消息</a>
                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">我的订单</a>
                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">设置</a>
                <hr class="my-1">
                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">退出登录</a>
              </div>
            </div>

            <!-- 移动端菜单按钮 -->
            <button 
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 移动端菜单 -->
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
          <div class="space-y-2">
            <!-- 移动端搜索 -->
            <div class="px-4 mb-4">
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="搜索..."
                  v-model="searchQuery"
                  @keyup.enter="performSearch"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <a href="#" class="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg mx-2 transition-colors">首页</a>
            <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 transition-colors">社区</a>
            <a href="#" @click="$router.push('/products')" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 transition-colors">商城</a>
            <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 transition-colors">活动</a>
            
            <button 
              @click="$router.push('/post/create')"
              class="w-full mx-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              发布内容
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 左侧边栏 -->
        <div class="hidden lg:block">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">热门话题</h3>
            <div class="space-y-3">
              <div 
                v-for="topic in hotTopics" 
                :key="topic.id"
                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                @click="filterByTopic(topic.name)"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-700">#{{ topic.name }}</span>
                </div>
                <span class="text-sm text-gray-500">{{ topic.count }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">推荐用户</h3>
            <div class="space-y-4">
              <div 
                v-for="user in recommendedUsers" 
                :key="user.id"
                class="flex items-center space-x-3"
              >
                <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ user.name }}</h4>
                  <p class="text-sm text-gray-500">{{ user.followers }} 关注者</p>
                </div>
                <button class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                  关注
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间内容区 -->
        <div class="lg:col-span-2">
          <!-- 筛选和排序 -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">分类：</span>
                  <select 
                    v-model="selectedCategory" 
                    @change="filterPosts"
                    class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">全部</option>
                    <option value="tech">技术讨论</option>
                    <option value="life">生活分享</option>
                    <option value="trade">交易相关</option>
                    <option value="question">问题求助</option>
                  </select>
                </div>
                
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">排序：</span>
                  <select 
                    v-model="sortBy" 
                    @change="sortPosts"
                    class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="latest">最新</option>
                    <option value="hot">最热</option>
                    <option value="likes">最多点赞</option>
                  </select>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  :class="[
                    'px-3 py-1 text-sm rounded-lg transition-colors',
                    viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  ]"
                  @click="viewMode = 'list'"
                >
                  列表
                </button>
                <button 
                  :class="[
                    'px-3 py-1 text-sm rounded-lg transition-colors',
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  ]"
                  @click="viewMode = 'grid'"
                >
                  网格
                </button>
              </div>
            </div>
          </div>

          <!-- 帖子列表 -->
          <div v-if="loading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <!-- 列表视图 -->
            <div v-if="viewMode === 'list'" class="space-y-4">
              <article 
                v-for="post in filteredPosts" 
                :key="post.id"
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
                @click="$router.push(`/post/${post.id}`)"
              >
                <div class="p-6">
                  <!-- 帖子头部 -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <img :src="post.author.avatar" :alt="post.author.name" class="w-12 h-12 rounded-full">
                      <div>
                        <h3 class="font-medium text-gray-900">{{ post.author.name }}</h3>
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{{ formatTime(post.createdAt) }}</span>
                          <span v-if="post.category" class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {{ getCategoryName(post.category) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                  </div>

                  <!-- 帖子内容 -->
                  <div class="mb-4">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h2>
                    <p class="text-gray-600 line-clamp-3">{{ post.content }}</p>
                  </div>

                  <!-- 帖子图片 -->
                  <div v-if="post.images && post.images.length > 0" class="mb-4">
                    <div class="grid grid-cols-3 gap-2" v-if="post.images.length > 1">
                      <img 
                        v-for="(image, index) in post.images.slice(0, 3)" 
                        :key="index"
                        :src="image" 
                        :alt="`图片${index + 1}`"
                        class="w-full h-24 object-cover rounded-lg"
                      >
                      <div 
                        v-if="post.images.length > 3"
                        class="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                      >
                        +{{ post.images.length - 3 }}
                      </div>
                    </div>
                    <img 
                      v-else
                      :src="post.images[0]" 
                      alt="帖子图片"
                      class="w-full h-48 object-cover rounded-lg"
                    >
                  </div>

                  <!-- 标签 -->
                  <div v-if="post.tags && post.tags.length > 0" class="mb-4">
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="tag in post.tags" 
                        :key="tag"
                        class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                        @click.stop="filterByTopic(tag)"
                      >
                        #{{ tag }}
                      </span>
                    </div>
                  </div>

                  <!-- 帖子底部操作 -->
                  <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div class="flex items-center space-x-6">
                      <button 
                        @click.stop="toggleLike(post)"
                        :class="[
                          'flex items-center space-x-2 text-sm transition-colors',
                          post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                        ]"
                      >
                        <svg class="w-5 h-5" :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span>{{ post.likes }}</span>
                      </button>
                      
                      <button class="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <span>{{ post.comments }}</span>
                      </button>
                      
                      <button 
                        @click.stop="toggleBookmark(post)"
                        :class="[
                          'flex items-center space-x-2 text-sm transition-colors',
                          post.isBookmarked ? 'text-yellow-600' : 'text-gray-500 hover:text-yellow-600'
                        ]"
                      >
                        <svg class="w-5 h-5" :fill="post.isBookmarked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                        <span>收藏</span>
                      </button>
                    </div>
                    
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <span>{{ post.views }}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- 网格视图 -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article 
                v-for="post in filteredPosts" 
                :key="post.id"
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
                @click="$router.push(`/post/${post.id}`)"
              >
                <!-- 图片 -->
                <div v-if="post.images && post.images.length > 0" class="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img :src="post.images[0]" :alt="post.title" class="w-full h-full object-cover">
                </div>
                
                <div class="p-4">
                  <!-- 作者信息 -->
                  <div class="flex items-center space-x-2 mb-3">
                    <img :src="post.author.avatar" :alt="post.author.name" class="w-8 h-8 rounded-full">
                    <span class="text-sm text-gray-600">{{ post.author.name }}</span>
                    <span class="text-sm text-gray-400">·</span>
                    <span class="text-sm text-gray-400">{{ formatTime(post.createdAt) }}</span>
                  </div>
                  
                  <!-- 标题和内容 -->
                  <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h3>
                  <p class="text-gray-600 text-sm line-clamp-2 mb-3">{{ post.content }}</p>
                  
                  <!-- 标签 -->
                  <div v-if="post.tags && post.tags.length > 0" class="mb-3">
                    <div class="flex flex-wrap gap-1">
                      <span 
                        v-for="tag in post.tags.slice(0, 2)" 
                        :key="tag"
                        class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- 统计信息 -->
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <div class="flex items-center space-x-4">
                      <span class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span>{{ post.likes }}</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <span>{{ post.comments }}</span>
                      </span>
                    </div>
                    <span>{{ post.views }} 浏览</span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- 加载更多 -->
          <div class="mt-8 text-center">
            <button 
              v-if="hasMore && !loading"
              @click="loadMore"
              class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              加载更多
            </button>
            <div v-if="loading" class="text-gray-500">加载中...</div>
            <div v-if="!hasMore && filteredPosts.length > 0" class="text-gray-500">没有更多内容了</div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="hidden lg:block">
          <!-- 快捷操作 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">快捷操作</h3>
            <div class="space-y-3">
              <button 
                @click="$router.push('/post/create')"
                class="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                发布帖子
              </button>
              <button 
                @click="$router.push('/products')"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                浏览商城
              </button>
            </div>
          </div>

          <!-- 热门商品 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">热门商品</h3>
            <div class="space-y-4">
              <div 
                v-for="product in hotProducts" 
                :key="product.id"
                class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                @click="$router.push(`/product/${product.id}`)"
              >
                <img :src="product.image" :alt="product.title" class="w-12 h-12 object-cover rounded-lg">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 text-sm line-clamp-1">{{ product.title }}</h4>
                  <p class="text-red-600 font-semibold text-sm">¥{{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 点击外部关闭菜单 -->
    <div v-if="showUserMenu || showMobileMenu" @click="closeMenus" class="fixed inset-0 z-40"></div>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  data() {
    return {
      searchQuery: '',
      showUserMenu: false,
      showMobileMenu: false,
      selectedCategory: '',
      sortBy: 'latest',
      viewMode: 'list',
      loading: false,
      hasMore: true,
      currentPage: 1,
      posts: [
        {
          id: 1,
          title: 'MacBook Pro 使用体验分享',
          content: '最近入手了新款MacBook Pro，使用了一段时间后想和大家分享一下使用体验。首先是性能方面，M1芯片确实很强大，日常使用非常流畅...',
          author: {
            id: 1,
            name: '数码达人小王',
            avatar: '/placeholder.svg?height=48&width=48'
          },
          category: 'tech',
          tags: ['MacBook', '数码', '体验分享'],
          images: ['/placeholder.svg?height=200&width=300', '/placeholder.svg?height=200&width=300'],
          likes: 128,
          comments: 45,
          views: 1250,
          isLiked: false,
          isBookmarked: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 2,
          title: '求推荐好用的编程工具',
          content: '最近在学习前端开发，想请教一下大家都在用什么编程工具？有什么好的推荐吗？主要是用来写JavaScript和Vue.js的...',
          author: {
            id: 2,
            name: '前端新手',
            avatar: '/placeholder.svg?height=48&width=48'
          },
          category: 'question',
          tags: ['编程', '工具', '前端'],
          images: [],
          likes: 67,
          comments: 23,
          views: 890,
          isLiked: true,
          isBookmarked: false,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
        },
        {
          id: 3,
          title: '今天的午餐很棒！',
          content: '在学校附近发现了一家很不错的餐厅，菜品丰富，价格也很实惠。特别推荐他们家的红烧肉，味道真的很棒！',
          author: {
            id: 3,
            name: '美食爱好者',
            avatar: '/placeholder.svg?height=48&width=48'
          },
          category: 'life',
          tags: ['美食', '生活', '推荐'],
          images: ['/placeholder.svg?height=200&width=300'],
          likes: 89,
          comments: 12,
          views: 456,
          isLiked: false,
          isBookmarked: true,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
        }
      ],
      hotTopics: [
        { id: 1, name: '数码科技', count: 1234 },
        { id: 2, name: '生活分享', count: 987 },
        { id: 3, name: '学习笔记', count: 756 },
        { id: 4, name: '美食推荐', count: 543 },
        { id: 5, name: '旅行日记', count: 432 }
      ],
      recommendedUsers: [
        { id: 1, name: '科技博主', avatar: '/placeholder.svg?height=40&width=40', followers: '1.2k' },
        { id: 2, name: '美食达人', avatar: '/placeholder.svg?height=40&width=40', followers: '856' },
        { id: 3, name: '摄影师', avatar: '/placeholder.svg?height=40&width=40', followers: '2.1k' }
      ],
      hotProducts: [
        { id: 1, title: 'iPhone 14 Pro', price: 7999, image: '/placeholder.svg?height=48&width=48' },
        { id: 2, title: 'MacBook Air M2', price: 8999, image: '/placeholder.svg?height=48&width=48' },
        { id: 3, title: 'iPad Pro', price: 6199, image: '/placeholder.svg?height=48&width=48' }
      ]
    }
  },
  computed: {
    filteredPosts() {
      let filtered = [...this.posts]
      
      // 按分类筛选
      if (this.selectedCategory) {
        filtered = filtered.filter(post => post.category === this.selectedCategory)
      }
      
      // 按搜索关键词筛选
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      // 排序
      switch (this.sortBy) {
        case 'hot':
          filtered.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
          break
        case 'likes':
          filtered.sort((a, b) => b.likes - a.likes)
          break
        case 'latest':
        default:
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
      }
      
      return filtered
    }
  },
  methods: {
    performSearch() {
      // 搜索功能
      console.log('搜索:', this.searchQuery)
    },
    filterPosts() {
      // 筛选帖子
      console.log('筛选分类:', this.selectedCategory)
    },
    sortPosts() {
      // 排序帖子
      console.log('排序方式:', this.sortBy)
    },
    filterByTopic(topic) {
      this.searchQuery = topic
      this.performSearch()
    },
    toggleLike(post) {
      post.isLiked = !post.isLiked
      post.likes += post.isLiked ? 1 : -1
    },
    toggleBookmark(post) {
      post.isBookmarked = !post.isBookmarked
    },
    loadMore() {
      this.loading = true
      // 模拟加载更多数据
      setTimeout(() => {
        this.currentPage++
        this.loading = false
        // 模拟没有更多数据
        if (this.currentPage >= 3) {
          this.hasMore = false
        }
      }, 1000)
    },
    formatTime(time) {
      const now = new Date()
      const diff = now - time
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (minutes < 1) return '刚刚'
      if (minutes < 60) return `${minutes}分钟前`
      if (hours < 24) return `${hours}小时前`
      if (days < 7) return `${days}天前`
      
      return time.toLocaleDateString()
    },
    getCategoryName(category) {
      const categoryMap = {
        'tech': '技术讨论',
        'life': '生活分享',
        'trade': '交易相关',
        'question': '问题求助'
      }
      return categoryMap[category] || category
    },
    closeMenus() {
      this.showUserMenu = false
      this.showMobileMenu = false
    }
  },
  mounted() {
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        this.showUserMenu = false
      }
    })
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>