<template>
  <div class="h-screen bg-gray-50 flex">
    <!-- 左侧聊天列表 -->
    <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
      <!-- 头部 -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">消息</h2>
          <button @click="$router.go(-1)" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 搜索框 -->
        <div class="mt-3 relative">
          <input 
            type="text" 
            placeholder="搜索聊天记录..."
            v-model="searchQuery"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      <!-- 聊天列表 -->
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="chat in filteredChats" 
          :key="chat.id"
          :class="[
            'p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
            selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
          ]"
          @click="selectChat(chat)"
        >
          <div class="flex items-start space-x-3">
            <div class="relative">
              <img :src="chat.avatar" :alt="chat.name" class="w-12 h-12 rounded-full">
              <div 
                v-if="chat.isOnline"
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
              ></div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h3 class="font-medium text-gray-900 truncate">{{ chat.name }}</h3>
                <span class="text-xs text-gray-500">{{ formatTime(chat.lastMessageTime) }}</span>
              </div>
              
              <p class="text-sm text-gray-600 truncate mt-1">{{ chat.lastMessage }}</p>
              
              <div class="flex items-center justify-between mt-2">
                <span 
                  v-if="chat.type === 'trade'"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                >
                  交易聊天
                </span>
                <div 
                  v-if="chat.unreadCount > 0"
                  class="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                >
                  {{ chat.unreadCount > 99 ? '99+' : chat.unreadCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧聊天窗口 -->
    <div class="flex-1 flex flex-col">
      <div v-if="selectedChat" class="h-full flex flex-col">
        <!-- 聊天头部 -->
        <div class="bg-white border-b border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img :src="selectedChat.avatar" :alt="selectedChat.name" class="w-10 h-10 rounded-full">
              <div>
                <h3 class="font-medium text-gray-900">{{ selectedChat.name }}</h3>
                <p class="text-sm text-gray-500">
                  {{ selectedChat.isOnline ? '在线' : `最后活跃：${formatTime(selectedChat.lastActiveTime)}` }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                v-if="selectedChat.type === 'trade'"
                @click="viewProduct"
                class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                查看商品
              </button>
              <button class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div ref="messageContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-for="message in messages" :key="message.id" :class="[
            'flex',
            message.senderId === currentUserId ? 'justify-end' : 'justify-start'
          ]">
            <div :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
              message.senderId === currentUserId 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-900'
            ]">
              <!-- 文本消息 -->
              <p v-if="message.type === 'text'">{{ message.content }}</p>
              
              <!-- 图片消息 -->
              <img 
                v-else-if="message.type === 'image'"
                :src="message.content"
                alt="图片消息"
                class="max-w-full rounded cursor-pointer"
                @click="previewImage(message.content)"
              >
              
              <!-- 商品卡片 -->
              <div v-else-if="message.type === 'product'" class="bg-white rounded-lg p-3 text-gray-900 max-w-sm">
                <div class="flex space-x-3">
                  <img :src="message.product.image" :alt="message.product.title" class="w-16 h-16 object-cover rounded">
                  <div class="flex-1">
                    <h4 class="font-medium text-sm">{{ message.product.title }}</h4>
                    <p class="text-red-600 font-semibold">¥{{ message.product.price }}</p>
                    <button class="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs opacity-70">{{ formatTime(message.timestamp) }}</span>
                <div v-if="message.senderId === currentUserId" class="flex items-center space-x-1">
                  <svg v-if="message.status === 'sent'" class="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <svg v-else-if="message.status === 'delivered'" class="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 正在输入提示 -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入框 -->
        <div class="bg-white border-t border-gray-200 p-4">
          <div class="flex items-end space-x-3">
            <!-- 功能按钮 -->
            <div class="flex space-x-2">
              <button 
                @click="$refs.imageInput.click()"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="发送图片"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
              
              <button 
                @click="showEmojiPicker = true"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="表情"
              >
                😊
              </button>
            </div>
            
            <!-- 输入框 -->
            <div class="flex-1">
              <textarea 
                v-model="newMessage"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.shift.enter.exact="newMessage += '\n'"
                @input="handleTyping"
                placeholder="输入消息... (Enter发送，Shift+Enter换行)"
                rows="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                style="min-height: 40px; max-height: 120px;"
              ></textarea>
            </div>
            
            <!-- 发送按钮 -->
            <button 
              @click="sendMessage"
              :disabled="!newMessage.trim()"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </button>
          </div>
          
          <input 
            ref="imageInput"
            type="file"
            accept="image/*"
            @change="sendImage"
            class="hidden"
          >
        </div>
      </div>
      
      <!-- 未选择聊天时的占位符 -->
      <div v-else class="flex-1 flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">选择一个聊天开始对话</h3>
          <p class="text-gray-500">在左侧选择一个联系人开始聊天</p>
        </div>
      </div>
    </div>

    <!-- 表情选择器 -->
    <div v-if="showEmojiPicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showEmojiPicker = false">
      <div class="bg-white rounded-lg p-4 w-80" @click.stop>
        <div class="grid grid-cols-8 gap-2">
          <button 
            v-for="emoji in emojis" 
            :key="emoji"
            @click="insertEmoji(emoji)"
            class="text-2xl hover:bg-gray-100 rounded p-2"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  data() {
    return {
      searchQuery: '',
      selectedChat: null,
      newMessage: '',
      isTyping: false,
      showEmojiPicker: false,
      currentUserId: 1,
      typingTimer: null,
      chats: [
        {
          id: 1,
          name: '数码达人小王',
          avatar: '/placeholder.svg?height=48&width=48',
          lastMessage: '商品还在吗？可以面交吗？',
          lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
          lastActiveTime: new Date(Date.now() - 10 * 60 * 1000),
          unreadCount: 2,
          isOnline: true,
          type: 'trade'
        },
        {
          id: 2,
          name: '张三',
          avatar: '/placeholder.svg?height=48&width=48',
          lastMessage: '好的，谢谢分享！',
          lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
          lastActiveTime: new Date(Date.now() - 30 * 60 * 1000),
          unreadCount: 0,
          isOnline: false,
          type: 'normal'
        },
        {
          id: 3,
          name: '李四',
          avatar: '/placeholder.svg?height=48&width=48',
          lastMessage: '这个价格可以商量吗？',
          lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
          lastActiveTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
          unreadCount: 1,
          isOnline: true,
          type: 'trade'
        }
      ],
      messages: [
        {
          id: 1,
          senderId: 2,
          type: 'text',
          content: '你好，请问这个MacBook还在吗？',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'delivered'
        },
        {
          id: 2,
          senderId: 1,
          type: 'text',
          content: '在的，成色很好，几乎全新',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          status: 'read'
        },
        {
          id: 3,
          senderId: 2,
          type: 'text',
          content: '可以看看实物照片吗？',
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          status: 'delivered'
        },
        {
          id: 4,
          senderId: 1,
          type: 'image',
          content: '/placeholder.svg?height=200&width=300',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          status: 'read'
        },
        {
          id: 5,
          senderId: 2,
          type: 'text',
          content: '看起来不错，可以面交吗？',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          status: 'delivered'
        }
      ],
      emojis: ['😊', '😂', '🤔', '👍', '❤️', '🎉', '🔥', '💡', '📚', '🎯', '✨', '🌟', '💪', '🚀', '🎨', '📱']
    }
  },
  computed: {
    filteredChats() {
      if (!this.searchQuery) return this.chats
      
      return this.chats.filter(chat => 
        chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    selectChat(chat) {
      this.selectedChat = chat
      // 标记为已读
      chat.unreadCount = 0
      // 滚动到底部
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    sendMessage() {
      if (!this.newMessage.trim()) return
      
      const message = {
        id: Date.now(),
        senderId: this.currentUserId,
        type: 'text',
        content: this.newMessage.trim(),
        timestamp: new Date(),
        status: 'sent'
      }
      
      this.messages.push(message)
      this.newMessage = ''
      
      // 更新聊天列表中的最后消息
      if (this.selectedChat) {
        this.selectedChat.lastMessage = message.content
        this.selectedChat.lastMessageTime = message.timestamp
      }
      
      this.$nextTick(() => {
        this.scrollToBottom()
      })
      
      // 模拟消息状态更新
      setTimeout(() => {
        message.status = 'delivered'
      }, 1000)
    },
    sendImage(event) {
      const file = event.target.files[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const message = {
          id: Date.now(),
          senderId: this.currentUserId,
          type: 'image',
          content: e.target.result,
          timestamp: new Date(),
          status: 'sent'
        }
        
        this.messages.push(message)
        
        if (this.selectedChat) {
          this.selectedChat.lastMessage = '[图片]'
          this.selectedChat.lastMessageTime = message.timestamp
        }
        
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
      reader.readAsDataURL(file)
      
      // 清空input
      event.target.value = ''
    },
    insertEmoji(emoji) {
      this.newMessage += emoji
      this.showEmojiPicker = false
    },
/*     handleTyping(emoji) {
      this.newMessage += emoji
      this.showEmojiPicker = false
    }, */
    handleTyping() {
      // 清除之前的定时器
      if (this.typingTimer) {
        clearTimeout(this.typingTimer)
      }
      
      // 发送正在输入状态
      this.isTyping = true
      
      // 3秒后停止输入状态
      this.typingTimer = setTimeout(() => {
        this.isTyping = false
      }, 3000)
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
    scrollToBottom() {
      const container = this.$refs.messageContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    previewImage(imageUrl) {
      // 实现图片预览功能
      console.log('预览图片:', imageUrl)
    },
    viewProduct() {
      // 跳转到商品详情页
      this.$router.push('/product/1')
    }
  },
  mounted() {
    // 默认选择第一个聊天
    if (this.chats.length > 0) {
      this.selectChat(this.chats[0])
    }
  }
}
</script>