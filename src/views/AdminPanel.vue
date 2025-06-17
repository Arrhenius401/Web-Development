<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-blue-600">社区交易</router-link>
          <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">管理后台</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button 
              @click="showNotifications = !showNotifications"
              class="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div v-if="showNotifications" class="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div class="py-2 px-4 border-b border-gray-200">
                <h3 class="text-sm font-medium text-gray-700">通知</h3>
              </div>
              <div class="max-h-60 overflow-y-auto">
                <div class="py-2 px-4 border-b border-gray-100 hover:bg-gray-50">
                  <p class="text-sm font-medium text-gray-800">新用户注册</p>
                  <p class="text-xs text-gray-500">用户 user123 刚刚注册了账号</p>
                  <p class="text-xs text-gray-400 mt-1">2分钟前</p>
                </div>
                <div class="py-2 px-4 border-b border-gray-100 hover:bg-gray-50">
                  <p class="text-sm font-medium text-gray-800">帖子被举报</p>
                  <p class="text-xs text-gray-500">帖子 #1234 被举报为垃圾内容</p>
                  <p class="text-xs text-gray-400 mt-1">15分钟前</p>
                </div>
                <div class="py-2 px-4 hover:bg-gray-50">
                  <p class="text-sm font-medium text-gray-800">系统通知</p>
                  <p class="text-xs text-gray-500">系统已完成每日数据备份</p>
                  <p class="text-xs text-gray-400 mt-1">1小时前</p>
                </div>
              </div>
              <div class="py-2 px-4 border-t border-gray-200 text-center">
                <button class="text-xs text-blue-600 hover:text-blue-800">查看全部通知</button>
              </div>
            </div>
          </div>
          
          <div class="flex items-center">
            <img src="/placeholder.svg?height=32&width=32" alt="Admin" class="w-8 h-8 rounded-full mr-2">
            <div>
              <p class="text-sm font-medium text-gray-700">管理员</p>
            </div>
            <div class="relative ml-2">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div v-if="showUserMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div class="py-1">
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人资料</router-link>
                  <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">系统设置</router-link>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">退出登录</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <div class="container mx-auto px-4 py-6">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 mr-4">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总帖子数</p>
              <p class="text-2xl font-semibold">1,248</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 mr-4">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总用户数</p>
              <p class="text-2xl font-semibold">856</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 mr-4">
              <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">今日新增帖子</p>
              <p class="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 mr-4">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">待处理举报</p>
              <p class="text-2xl font-semibold">7</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="bg-white rounded-xl shadow-lg mb-6">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button 
              @click="activeTab = 'posts'"
              :class="[
                'py-4 px-6 text-center border-b-2 font-medium text-sm focus:outline-none',
                activeTab === 'posts' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              帖子管理
            </button>
            <button 
              @click="activeTab = 'users'"
              :class="[
                'py-4 px-6 text-center border-b-2 font-medium text-sm focus:outline-none',
                activeTab === 'users' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              用户管理
            </button>
          </nav>
        </div>

        <!-- 帖子管理 -->
        <div v-if="activeTab === 'posts'" class="p-6">
          <!-- 搜索和筛选 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">搜索</label>
              <input 
                v-model="postFilters.search" 
                type="text" 
                placeholder="输入ID或标题搜索" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select 
                v-model="postFilters.status" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">全部状态</option>
                <option v-bind:value="POST_STATUS_NORMAL">正常</option>
                <option v-bind:value="POST_STATUS_HIDDEN">隐藏</option>
                <option v-bind:value="POST_STATUS_DELETED">已删除</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
              <div class="flex space-x-2">
                <select 
                  v-model="postSorting.field" 
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="postID">ID</option>
                  <option value="createTime">创建时间</option>
                  <option value="likeCount">点赞数</option>
                  <option value="commentCount">评论数</option>
                </select>
                <button 
                  @click="postSorting.order = postSorting.order === 'asc' ? 'desc' : 'asc'" 
                  class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg v-if="postSorting.order === 'asc'" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 帖子列表 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标题
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作者
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    点赞/评论
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="post in filteredPosts" :key="post.postID" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ post.postID }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <span v-if="post.isHot" class="mr-1 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">热门</span>
                      <span class="truncate max-w-xs">{{ post.title }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ post.username }} (ID: {{ post.userID }})
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                      </svg>
                      {{ post.likeCount }}
                      <svg class="w-4 h-4 text-blue-500 ml-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                      </svg>
                      {{ post.commentCount }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(post.createTime) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        post.status === POST_STATUS_NORMAL ? 'bg-green-100 text-green-800' : 
                        post.status === POST_STATUS_HIDDEN ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ getPostStatusText(post.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex space-x-2">
                      <button 
                        @click="viewPost(post)" 
                        class="text-blue-600 hover:text-blue-900"
                      >
                        查看
                      </button>
                      <button 
                        v-if="post.status !== POST_STATUS_NORMAL"
                        @click="changePostStatus(post.postID, POST_STATUS_NORMAL)" 
                        class="text-green-600 hover:text-green-900"
                      >
                        恢复
                      </button>
                      <button 
                        v-if="post.status !== POST_STATUS_HIDDEN"
                        @click="changePostStatus(post.postID, POST_STATUS_HIDDEN)" 
                        class="text-yellow-600 hover:text-yellow-900"
                      >
                        隐藏
                      </button>
                      <button 
                        v-if="post.status !== POST_STATUS_DELETED"
                        @click="changePostStatus(post.postID, POST_STATUS_DELETED)" 
                        class="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="mt-4 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示第 <span class="font-medium">{{ (postCurrentPage - 1) * pageSize + 1 }}</span> 到 
                <span class="font-medium">{{ Math.min(postCurrentPage * pageSize, filteredPosts.length) }}</span> 条，
                共 <span class="font-medium">{{ filteredPosts.length }}</span> 条记录
              </p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="postCurrentPage = Math.max(1, postCurrentPage - 1)" 
                :disabled="postCurrentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                上一页
              </button>
              <button 
                @click="postCurrentPage = Math.min(Math.ceil(filteredPosts.length / pageSize), postCurrentPage + 1)" 
                :disabled="postCurrentPage >= Math.ceil(filteredPosts.length / pageSize)"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          </div>
        </div>


        <!-- 用户管理 -->
        <div v-if="activeTab === 'users'" class="p-6">
          <!-- 搜索和筛选 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">搜索</label>
              <input 
                v-model="userFilters.search" 
                type="text" 
                placeholder="输入ID、用户名或邮箱搜索" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select 
                v-model="userFilters.status" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">全部状态</option>
                <option v-bind:value="USER_STATUS_NORMAL">正常</option>
                <option v-bind:value="USER_STATUS_BANNED">已封禁</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
              <div class="flex space-x-2">
                <select 
                  v-model="userSorting.field" 
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="userID">ID</option>
                  <option value="username">用户名</option>
                  <option value="initDate">注册时间</option>
                </select>
                <button 
                  @click="userSorting.order = userSorting.order === 'asc' ? 'desc' : 'asc'" 
                  class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg v-if="userSorting.order === 'asc'" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 用户列表 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    联系方式
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in filteredUsers" :key="user.userID" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ user.userID }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="user.profilePicture || '/placeholder.svg?height=40&width=40'" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{{ user.email }}</div>
                    <div>{{ formatPhone(user.phoneNumber) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.initDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span 
                      :class="[
                        'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                        user.role === USER_ROLE_ADMIN ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      ]"
                    >
                      {{ user.role === USER_ROLE_ADMIN ? '管理员' : '普通用户' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        user.status === POST_STATUS_NORMAL ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ getUserStatusText(user.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex space-x-2">
                      <button 
                        @click="viewUser(user)" 
                        class="text-blue-600 hover:text-blue-900"
                      >
                        查看
                      </button>
                      <button 
                        v-if="user.status === POST_STATUS_NORMAL"
                        @click="changeUserStatus(user.userID, USER_STATUS_BANNED)" 
                        class="text-red-600 hover:text-red-900"
                      >
                        封禁
                      </button>
                      <button 
                        v-else
                        @click="changeUserStatus(user.userID, POST_STATUS_NORMAL)" 
                        class="text-green-600 hover:text-green-900"
                      >
                        解封
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="mt-4 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示第 <span class="font-medium">{{ (userCurrentPage - 1) * pageSize + 1 }}</span> 到 
                <span class="font-medium">{{ Math.min(userCurrentPage * pageSize, filteredUsers.length) }}</span> 条，
                共 <span class="font-medium">{{ filteredUsers.length }}</span> 条记录
              </p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="userCurrentPage = Math.max(1, userCurrentPage - 1)" 
                :disabled="userCurrentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                上一页
              </button>
              <button 
                @click="userCurrentPage = Math.min(Math.ceil(filteredUsers.length / pageSize), userCurrentPage + 1)" 
                :disabled="userCurrentPage >= Math.ceil(filteredUsers.length / pageSize)"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>

    <!-- 帖子详情模态框 -->
    <div v-if="showPostModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">帖子详情</h3>
          <button @click="showPostModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div v-if="selectedPost" class="space-y-4">
            <div class="flex justify-between items-start">
              <h2 class="text-xl font-bold">{{ selectedPost.title }}</h2>
              <span 
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  selectedPost.status === POST_STATUS_NORMAL ? 'bg-green-100 text-green-800' : 
                  selectedPost.status === POST_STATUS_HIDDEN ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                ]"
              >
                {{ getPostStatusText(selectedPost.status) }}
              </span>
            </div>
            
            <div class="flex items-center text-sm text-gray-500">
              <span>ID: {{ selectedPost.postID }}</span>
              <span class="mx-2">•</span>
              <span>作者: {{ selectedPost.username }} (ID: {{ selectedPost.userID }})</span>
              <span class="mx-2">•</span>
              <span>{{ formatDate(selectedPost.createTime) }}</span>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="prose max-w-none" v-html="selectedPost.content"></div>
            </div>
            
            <div class="flex items-center space-x-4 text-sm">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
                {{ selectedPost.likeCount }} 点赞
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                </svg>
                {{ selectedPost.commentCount }} 评论
              </div>
              <div v-if="selectedPost.isHot" class="flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path>
                </svg>
                热门帖子
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button 
                v-if="selectedPost.status !== POST_STATUS_NORMAL"
                @click="changePostStatus(selectedPost.postID, POST_STATUS_NORMAL); showPostModal = false" 
                class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                恢复帖子
              </button>
              <button 
                v-if="selectedPost.status !== POST_STATUS_HIDDEN"
                @click="changePostStatus(selectedPost.postID, POST_STATUS_HIDDEN); showPostModal = false" 
                class="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                隐藏帖子
              </button>
              <button 
                v-if="selectedPost.status !== POST_STATUS_DELETED"
                @click="changePostStatus(selectedPost.postID, POST_STATUS_DELETED); showPostModal = false" 
                class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                删除帖子
              </button>
              <button 
                @click="toggleHotStatus(selectedPost); showPostModal = false" 
                :class="[
                  'px-3 py-1 rounded-lg transition-colors',
                  selectedPost.isHot 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                ]"
              >
                {{ selectedPost.isHot ? '取消热门' : '设为热门' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户详情模态框 -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">用户详情</h3>
          <button @click="showUserModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div v-if="selectedUser" class="space-y-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-24 w-24">
                <img class="h-24 w-24 rounded-full" :src="selectedUser.profilePicture || '/placeholder.svg?height=96&width=96'" alt="">
              </div>
              <div class="ml-6">
                <h2 class="text-xl font-bold text-gray-900">{{ selectedUser.username }}</h2>
                <div class="flex items-center mt-1">
                  <span 
                    :class="[
                      'px-2 py-1 text-xs font-semibold rounded-full mr-2',
                      selectedUser.role === USER_ROLE_ADMIN ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ selectedUser.role === USER_ROLE_ADMIN ? '管理员' : '普通用户' }}
                  </span>
                  <span 
                    :class="[
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      selectedUser.status === USER_STATUS_NORMAL ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ getUserStatusText(selectedUser.status) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="text-sm">
                  <span class="text-gray-500">用户ID:</span>
                  <span class="ml-2 text-gray-900">{{ selectedUser.userID }}</span>
                </div>
                <div class="text-sm">
                  <span class="text-gray-500">注册时间:</span>
                  <span class="ml-2 text-gray-900">{{ formatDate(selectedUser.initDate) }}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="text-sm">
                  <span class="text-gray-500">邮箱:</span>
                  <span class="ml-2 text-gray-900">{{ selectedUser.email }}</span>
                </div>
                <div class="text-sm">
                  <span class="text-gray-500">手机号:</span>
                  <span class="ml-2 text-gray-900">{{ formatPhone(selectedUser.phoneNumber) }}</span>
                </div>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 mb-3">用户统计</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ userStats.postCount }}</div>
                  <div class="text-sm text-gray-500">发布帖子</div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                  <div class="text-2xl font-bold text-green-600">{{ userStats.commentCount }}</div>
                  <div class="text-sm text-gray-500">评论数</div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                  <div class="text-2xl font-bold text-purple-600">{{ userStats.likeCount }}</div>
                  <div class="text-sm text-gray-500">获赞数</div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button 
                v-if="selectedUser.status === USER_STATUS_NORMAL"
                @click="changeUserStatus(selectedUser.userID, USER_STATUS_BANNED); showUserModal = false" 
                class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                封禁用户
              </button>
              <button 
                v-else
                @click="changeUserStatus(selectedUser.userID, USER_STATUS_NORMAL); showUserModal = false" 
                class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                解除封禁
              </button>
              <button 
                @click="showUserModal = false" 
                class="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getAllPost, getAllUser, updatePostStatus, updateUserStatus } from '../services/api'

export default {
  name: 'AdminPanel',
  data() {
    return {
      //帖子状态常量
      POST_STATUS_NORMAL: "NORMAL",
      POST_STATUS_DELETED: "DELETED",
      POST_STATUS_HIDDEN: "HIDDEN",

      //用户状态常量
      USER_STATUS_NORMAL: "NORMAL",
      USER_STATUS_BANNED: "BANNED",

      //用户角色常量
      USER_ROLE_ADMIN: "ROLE_ADMIN",
      USER_ROLE_USER: "ROLE_USER",

      activeTab: 'posts',
      showNotifications: false,
      showUserMenu: false,
      showPostModal: false,
      showUserModal: false,
      selectedPost: null,
      selectedUser: null,
      pageSize: 10,
      
      // 帖子管理
      postFilters: {
        search: '',
        status: ''
      },
      postSorting: {
        field: 'createTime',
        order: 'desc'
      },
      postCurrentPage: 1,
      posts: [],
      
      // 用户管理
      userFilters: {
        search: '',
        status: '',
        role: ''
      },
      userSorting: {
        field: 'initDate',
        order: 'desc'
      },
      userCurrentPage: 1,
      users: [],
      
      // 用户统计
      userStats: {
        postCount: 0,
        commentCount: 0,
        likeCount: 0
      }
    }
  },
  computed: {
    // 帖子过滤和分页
    filteredPosts() {
      let result = [...this.posts]
      
      // 搜索过滤
      if (this.postFilters.search) {
        const search = this.postFilters.search.toLowerCase()
        result = result.filter(post => 
          post.postID.toString().includes(search) || 
          post.title.toLowerCase().includes(search)
        )
      }
      
      // 状态过滤
      if (this.postFilters.status) {
        result = result.filter(post => post.status === this.postFilters.status)
      }
      
      // 排序
      result.sort((a, b) => {
        let comparison = 0
        
        if (this.postSorting.field === 'postID') {
          comparison = a.postID - b.postID
        } else if (this.postSorting.field === 'createTime') {
          comparison = new Date(a.createTime) - new Date(b.createTime)
        } else if (this.postSorting.field === 'likeCount') {
          comparison = a.likeCount - b.likeCount
        } else if (this.postSorting.field === 'commentCount') {
          comparison = a.commentCount - b.commentCount
        }
        
        return this.postSorting.order === 'asc' ? comparison : -comparison
      })
      
      return result
    },
    
    paginatedPosts() {
      const start = (this.postCurrentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredPosts.slice(start, end)
    },
    
    // 用户过滤和分页
    filteredUsers() {
      let result = [...this.users]
      
      // 搜索过滤
      if (this.userFilters.search) {
        const search = this.userFilters.search.toLowerCase()
        result = result.filter(user => 
          user.userID.toString().includes(search) || 
          user.username.toLowerCase().includes(search) ||
          (user.email && user.email.toLowerCase().includes(search))
        )
      }
      
      // 状态过滤
      if (this.userFilters.status) {
        result = result.filter(user => user.status === this.userFilters.status)
      }
      
      // 角色过滤
      if (this.userFilters.role) {
        result = result.filter(user => user.role === this.userFilters.role)
      }
      
      // 排序
      result.sort((a, b) => {
        let comparison = 0
        
        if (this.userSorting.field === 'userID') {
          comparison = a.userID - b.userID
        } else if (this.userSorting.field === 'username') {
          comparison = a.username.localeCompare(b.username)
        } else if (this.userSorting.field === 'initDate') {
          comparison = new Date(a.initDate) - new Date(b.initDate)
        }
        
        return this.userSorting.order === 'asc' ? comparison : -comparison
      })
      
      return result
    },
    
    paginatedUsers() {
      const start = (this.userCurrentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredUsers.slice(start, end)
    }
  },
  mounted() {
    this.fetchPosts()
    this.fetchUsers()
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', this.closeDropdowns)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdowns)
  },
  methods: {
    closeDropdowns() {
      this.showNotifications = false
      this.showUserMenu = false
    },
    
    logout() {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      this.$router.push('/login')
    },
    
    async fetchPosts(){
      try{
        this.posts = await getAllPost()
        this.posts = this.posts.map(post => ({
          ...post,
          summary: post.content.substring(0, 10) + '...',
          time: this.$formatTime(new Date(post.createTime)),
          avatar: null
        }));
      }catch(error){
        console.log("控制台获取帖子出错: ", error)
      } 
    },
    
    async changePostStatus(postId, status) {
      try {
        let isValid = await updatePostStatus(postId, status)
        
        if(!isValid){
          this.showToast('error', '操作失败', '更改帖子状态失败，请重试')
          return
        }

        // 更新本地数据
        const post = this.posts.find(p => p.postID === postId)
        if (post) {
          post.status = status
        }
        
        if (this.selectedPost && this.selectedPost.postID === postId) {
          this.selectedPost.status = status
        }
        
        // 显示成功提示
        this.showToast('success', '操作成功', `帖子状态已更改为${this.getPostStatusText(status)}`)
      } catch (error) {
        console.error('更改帖子状态失败:', error)
        this.showToast('error', '操作失败', '更改帖子状态失败，请重试')
      }
    },
    
    async toggleHotStatus(post) {
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // 更新本地数据
        post.isHot = !post.isHot
        
        // 显示成功提示
        this.showToast('success', '操作成功', post.isHot ? '帖子已设为热门' : '帖子已取消热门')
      } catch (error) {
        console.error('更改热门状态失败:', error)
        this.showToast('error', '操作失败', '更改热门状态失败，请重试')
      }
    },
    
    viewPost(post) {
      this.selectedPost = { ...post }
      this.showPostModal = true
    },
    
    // 用户管理方法
    async fetchUsers() {
      try{
        this.users = await getAllUser()
      }catch(error){
        console.log("控制台获取帖子出错: ", error)
      } 
    },
    
    async changeUserStatus(userId, status) {
      try {
        let isValid = await updateUserStatus(userId, status)
        
        if(!isValid){
          this.showToast('error', '操作失败', '更改帖子状态失败，请重试')
          return
        }
        
        // 更新本地数据
        const user = this.users.find(u => u.userID === userId)
        if (user) {
          user.status = status
        }
        
        if (this.selectedUser && this.selectedUser.userID === userId) {
          this.selectedUser.status = status
        }
        
        // 显示成功提示
        this.showToast('success', '操作成功', `用户状态已更改为${this.getUserStatusText(status)}`)
      } catch (error) {
        console.error('更改用户状态失败:', error)
        this.showToast('error', '操作失败', '更改用户状态失败，请重试')
      }
    },
    
    async viewUser(user) {
      this.selectedUser = { ...user }
      this.showUserModal = true
      
      // 获取用户统计数据
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // 模拟数据
        this.userStats = {
          postCount: Math.floor(Math.random() * 50),
          commentCount: Math.floor(Math.random() * 200),
          likeCount: Math.floor(Math.random() * 500)
        }
      } catch (error) {
        console.error('获取用户统计数据失败:', error)
      }
    },
    
    // 工具方法
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    },
    
    formatPhone(phone) {
      if (!phone) return ''
      const phoneStr = phone.toString()
      return phoneStr.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    },
    
    //获得帖子状态文本
    getPostStatusText(status) {
      switch (status) {
        case this.POST_STATUS_NORMAL: return '正常'
        case this.POST_STATUS_HIDDEN: return '隐藏'
        case this.POST_STATUS_DELETED: return '已删除'
        default: return '未知'
      }
    },
    
    //获得用户状态文本
    getUserStatusText(status) {
      switch (status) {
        case this.USER_STATUS_NORMAL: return '正常'
        case this.USER_STATUS_BANNED: return '已封禁'
        default: return '未知'
      }
    },
    
    showToast(type, title, message) {
      // 简单的消息提示实现
      const toast = document.createElement('div')
      toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all transform translate-y-0 opacity-100 ${
        type === 'success' ? 'bg-green-50 border-l-4 border-green-500' : 
        type === 'error' ? 'bg-red-50 border-l-4 border-red-500' : 
        'bg-blue-50 border-l-4 border-blue-500'
      }`
      
      const iconColor = type === 'success' ? 'text-green-500' : 
                        type === 'error' ? 'text-red-500' : 
                        'text-blue-500'
      
      let icon = ''
      if (type === 'success') {
        icon = `<svg class="w-6 h-6 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>`
      } else if (type === 'error') {
        icon = `<svg class="w-6 h-6 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>`
      } else {
        icon = `<svg class="w-6 h-6 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`
      }
      
      toast.innerHTML = `
        <div class="${iconColor}">${icon}</div>
        <div>
          <div class="font-medium ${type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-blue-800'}">${title}</div>
          <div class="text-sm ${type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-700' : 'text-blue-700'}">${message}</div>
        </div>
        <button class="ml-auto text-gray-400 hover:text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      `
      
      document.body.appendChild(toast)
      
      // 添加关闭按钮事件
      toast.querySelector('button').addEventListener('click', () => {
        toast.classList.replace('translate-y-0', '-translate-y-12')
        toast.classList.replace('opacity-100', 'opacity-0')
        setTimeout(() => {
          document.body.removeChild(toast)
        }, 300)
      })
      
      // 自动关闭
      setTimeout(() => {
        toast.classList.replace('translate-y-0', '-translate-y-12')
        toast.classList.replace('opacity-100', 'opacity-0')
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast)
          }
        }, 300)
      }, 3000)
    }
  }
}
</script>

<style scoped>
/* 添加过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>