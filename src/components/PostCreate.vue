<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <button @click="$router.go(-1)" class="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-xl font-bold text-blue-600">发布帖子</h1>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="saveDraft"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              保存草稿
            </button>
            <button 
              @click="publishPost"
              :disabled="!canPublish"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发布
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <form @submit.prevent="publishPost" class="space-y-6">
          <!-- 标题输入 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">标题</label>
            <input 
              type="text" 
              v-model="post.title"
              placeholder="请输入帖子标题..."
              maxlength="100"
              class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <div class="flex justify-between mt-1">
              <span class="text-sm text-gray-500">一个好的标题能吸引更多人阅读</span>
              <span class="text-sm text-gray-400">{{ post.title.length }}/100</span>
            </div>
          </div>

          <!-- 话题标签 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">话题标签</label>
            <div class="flex flex-wrap gap-2 mb-3">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                #{{ tag }}
                <button 
                  type="button"
                  @click="removeTag(tag)"
                  class="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
            </div>
            
            <div class="flex items-center space-x-2">
              <input 
                type="text" 
                v-model="newTag"
                @keyup.enter="addTag"
                placeholder="输入话题标签，按回车添加"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <button 
                type="button"
                @click="addTag"
                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                添加
              </button>
            </div>
            
            <!-- 推荐标签 -->
            <div class="mt-3">
              <span class="text-sm text-gray-500 mr-2">推荐标签：</span>
              <button 
                v-for="tag in recommendedTags" 
                :key="tag"
                type="button"
                @click="addRecommendedTag(tag)"
                class="inline-block px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded mr-2"
              >
                #{{ tag }}
              </button>
            </div>
          </div>

          <!-- 内容编辑器 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <!-- 工具栏 -->
              <div class="bg-gray-50 border-b border-gray-300 p-3 flex items-center space-x-2">
                <button 
                  type="button"
                  @click="formatText('bold')"
                  class="p-2 hover:bg-gray-200 rounded"
                  title="加粗"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"></path>
                  </svg>
                </button>
                
                <button 
                  type="button"
                  @click="formatText('italic')"
                  class="p-2 hover:bg-gray-200 rounded"
                  title="斜体"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4l4 16m-4-8h8"></path>
                  </svg>
                </button>
                
                <div class="w-px h-6 bg-gray-300"></div>
                
                <button 
                  type="button"
                  @click="insertEmoji"
                  class="p-2 hover:bg-gray-200 rounded"
                  title="表情"
                >
                  😊
                </button>
                
                <button 
                  type="button"
                  @click="$refs.imageInput.click()"
                  class="p-2 hover:bg-gray-200 rounded"
                  title="插入图片"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
              
              <!-- 文本编辑区 -->
              <textarea 
                ref="contentEditor"
                v-model="post.content"
                placeholder="分享你的想法..."
                rows="12"
                class="w-full p-4 border-0 focus:ring-0 resize-none"
              ></textarea>
            </div>
            
            <div class="flex justify-between mt-2">
              <span class="text-sm text-gray-500">支持Markdown语法</span>
              <span class="text-sm text-gray-400">{{ post.content.length }} 字符</span>
            </div>
          </div>

          <!-- 图片上传 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">图片 (最多9张)</label>
            <div class="grid grid-cols-3 gap-4">
              <!-- 已上传的图片 -->
              <div 
                v-for="(image, index) in post.images" 
                :key="index"
                class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
              >
                <img :src="image.url" :alt="`图片${index + 1}`" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    @click="removeImage(index)"
                    class="text-white hover:text-red-300"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- 上传按钮 -->
              <button 
                v-if="post.images.length < 9"
                type="button"
                @click="$refs.imageInput.click()"
                class="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div class="text-center">
                  <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span class="text-sm text-gray-500">添加图片</span>
                </div>
              </button>
            </div>
            
            <input 
              ref="imageInput"
              type="file"
              multiple
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            >
          </div>

          <!-- 发布设置 -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">发布设置</h3>
            <div class="space-y-3">
              <label class="flex items-center space-x-3">
                <input type="checkbox" v-model="post.allowComments" class="text-blue-600">
                <span class="text-gray-700">允许评论</span>
              </label>
              
              <label class="flex items-center space-x-3">
                <input type="checkbox" v-model="post.isAnonymous" class="text-blue-600">
                <span class="text-gray-700">匿名发布</span>
              </label>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">可见范围</label>
                <select v-model="post.visibility" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="public">所有人可见</option>
                  <option value="followers">仅关注者可见</option>
                  <option value="private">仅自己可见</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 表情选择器 -->
    <div v-if="showEmojiPicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showEmojiPicker = false">
      <div class="bg-white rounded-lg p-4 w-80" @click.stop>
        <div class="grid grid-cols-8 gap-2">
          <button 
            v-for="emoji in emojis" 
            :key="emoji"
            type="button"
            @click="insertEmojiAtCursor(emoji)"
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
  name: 'PostCreate',
  data() {
    return {
      post: {
        title: '',
        content: '',
        tags: [],
        images: [],
        allowComments: true,
        isAnonymous: false,
        visibility: 'public'
      },
      newTag: '',
      showEmojiPicker: false,
      recommendedTags: ['好物分享', '技术讨论', '生活日常', '学习笔记', '工作感悟'],
      emojis: ['😊', '😂', '🤔', '👍', '❤️', '🎉', '🔥', '💡', '📚', '🎯', '✨', '🌟', '💪', '🚀', '🎨', '📱']
    }
  },
  computed: {
    canPublish() {
      return this.post.title.trim() && this.post.content.trim()
    }
  },
  methods: {
    addTag() {
      const tag = this.newTag.trim()
      if (tag && !this.post.tags.includes(tag) && this.post.tags.length < 5) {
        this.post.tags.push(tag)
        this.newTag = ''
      }
    },
    removeTag(tag) {
      this.post.tags = this.post.tags.filter(t => t !== tag)
    },
    addRecommendedTag(tag) {
      if (!this.post.tags.includes(tag) && this.post.tags.length < 5) {
        this.post.tags.push(tag)
      }
    },
    formatText(command) {
      document.execCommand(command, false, null)
      this.$refs.contentEditor.focus()
    },
    insertEmoji() {
      this.showEmojiPicker = true
    },
    insertEmojiAtCursor(emoji) {
      const textarea = this.$refs.contentEditor
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = this.post.content
      
      this.post.content = text.substring(0, start) + emoji + text.substring(end)
      
      this.$nextTick(() => {
        textarea.focus()
        textarea.setSelectionRange(start + emoji.length, start + emoji.length)
      })
      
      this.showEmojiPicker = false
    },
    handleImageUpload(event) {
      const files = Array.from(event.target.files)
      const remainingSlots = 9 - this.post.images.length
      
      files.slice(0, remainingSlots).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.post.images.push({
              file: file,
              url: e.target.result,
              name: file.name
            })
          }
          reader.readAsDataURL(file)
        }
      })
      
      // 清空input
      event.target.value = ''
    },
    removeImage(index) {
      this.post.images.splice(index, 1)
    },
    saveDraft() {
      // 保存草稿到本地存储
      const draft = {
        ...this.post,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('postDraft', JSON.stringify(draft))
      
      // 显示保存成功提示
      console.log('草稿已保存')
    },
    publishPost() {
      if (!this.canPublish) return
      
      const postData = {
        ...this.post,
        publishedAt: new Date().toISOString()
      }
      
      console.log('发布帖子:', postData)
      
      // 清除草稿
      localStorage.removeItem('postDraft')
      
      // 跳转到帖子详情页
      this.$router.push('/post/1')
    },
    loadDraft() {
      const draft = localStorage.getItem('postDraft')
      if (draft) {
        const parsedDraft = JSON.parse(draft)
        this.post = { ...this.post, ...parsedDraft }
      }
    }
  },
  mounted() {
    this.loadDraft()
  }
}
</script>