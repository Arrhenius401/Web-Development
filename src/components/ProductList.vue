<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-xl font-bold text-blue-600">商品市场</h1>
          <div class="flex items-center space-x-4">
            <button @click="$router.push('/product/create')" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              发布商品
            </button>
            <button @click="$router.push('/')" class="text-gray-600 hover:text-gray-900">
              返回社区
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 搜索栏 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- 搜索输入框 -->
          <div class="flex-1">
            <div class="relative">
              <input
                type="text"
                placeholder="搜索商品..."
                v-model="searchQuery"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg class="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <!-- 热门搜索词 -->
            <div class="flex items-center space-x-2 mt-2">
              <span class="text-sm text-gray-500">热门：</span>
              <span 
                v-for="keyword in hotKeywords" 
                :key="keyword"
                class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm cursor-pointer hover:bg-gray-200"
                @click="searchQuery = keyword"
              >
                {{ keyword }}
              </span>
            </div>
          </div>
          
          <!-- 筛选条件 -->
          <div class="flex space-x-4">
            <select v-model="filters.category" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">全部分类</option>
              <option value="electronics">数码电子</option>
              <option value="books">图书文具</option>
              <option value="clothing">服装配饰</option>
              <option value="home">家居用品</option>
            </select>
            
            <select v-model="filters.condition" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">全部成色</option>
              <option value="new">全新</option>
              <option value="like-new">几乎全新</option>
              <option value="good">成色良好</option>
              <option value="fair">有使用痕迹</option>
            </select>
            
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">价格：</span>
              <input 
                type="number" 
                placeholder="最低价"
                v-model="filters.minPrice"
                class="w-20 px-2 py-2 border border-gray-300 rounded text-sm"
              />
              <span class="text-gray-400">-</span>
              <input 
                type="number" 
                placeholder="最高价"
                v-model="filters.maxPrice"
                class="w-20 px-2 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          @click="$router.push(`/product/${product.id}`)"
        >
          <!-- 商品图片 -->
          <div class="relative">
            <img :src="product.images[0]" :alt="product.title" class="w-full h-48 object-cover">
            <div class="absolute top-2 left-2">
              <span 
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                ]"
              >
                {{ getConditionText(product.condition) }}
              </span>
            </div>
            <button 
              class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md"
              @click.stop="toggleFavorite(product.id)"
            >
              <svg 
                class="w-4 h-4" 
                :class="product.isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
          
          <!-- 商品信息 -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.title }}</h3>
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl font-bold text-red-600">¥{{ product.price }}</span>
              <span class="text-sm text-gray-500">{{ product.views }} 浏览</span>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ product.location }}</span>
              <span>{{ product.publishTime }}</span>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="px-4 pb-4">
            <button 
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
              @click.stop="buyNow(product)"
            >
              立即购买
            </button>
          </div>
        </div>
      </div>

      <!-- 分页控件 -->
      <div class="flex items-center justify-center space-x-2">
        <button 
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          上一页
        </button>
        
        <div class="flex space-x-1">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            :class="[
              'px-3 py-2 border rounded-lg',
              page === currentPage 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 hover:bg-gray-50'
            ]"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          下一页
        </button>
        
        <div class="ml-4 text-sm text-gray-500">
          共 {{ totalProducts }} 件商品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      totalPages: 10,
      totalProducts: 156,
      filters: {
        category: '',
        condition: '',
        minPrice: '',
        maxPrice: ''
      },
      hotKeywords: ['9成新笔记本', '二手手机', '教材书籍', '数码配件'],
      products: [
        {
          id: 1,
          title: 'MacBook Pro 13寸 2021款 M1芯片',
          price: 8500,
          condition: 'like-new',
          images: ['/placeholder.svg?height=200&width=300'],
          views: 128,
          location: '北京',
          publishTime: '2小时前',
          isFavorited: false
        },
        {
          id: 2,
          title: 'iPhone 14 Pro 256GB 深空黑色',
          price: 7200,
          condition: 'good',
          images: ['/placeholder.svg?height=200&width=300'],
          views: 89,
          location: '上海',
          publishTime: '5小时前',
          isFavorited: true
        },
        {
          id: 3,
          title: '全新未拆封 AirPods Pro 第二代',
          price: 1800,
          condition: 'new',
          images: ['/placeholder.svg?height=200&width=300'],
          views: 256,
          location: '广州',
          publishTime: '1天前',
          isFavorited: false
        },
        {
          id: 4,
          title: '大学教材 计算机网络原理',
          price: 45,
          condition: 'good',
          images: ['/placeholder.svg?height=200&width=300'],
          views: 67,
          location: '深圳',
          publishTime: '2天前',
          isFavorited: false
        },
        {
          id: 5,
          title: 'Nintendo Switch OLED 白色',
          price: 2100,
          condition: 'like-new',
          images: ['/placeholder.svg?height=200&width=300'],
          views: 145,
          location: '杭州',
          publishTime: '3天前',
          isFavorited: false
        },
        {
          id: 6,
          title: '戴森吹风机 HD08 限定色',
          price: 1200,
          condition: 'good',
          images: ['/placeholder.svg?height=200&width=300'],
          views: 98,
          location: '成都',
          publishTime: '4天前',
          isFavorited: true
        }
      ]
    }
  },
  computed: {
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
  methods: {
    getConditionText(condition) {
      const conditionMap = {
        'new': '全新',
        'like-new': '几乎全新',
        'good': '成色良好',
        'fair': '有使用痕迹'
      }
      return conditionMap[condition] || condition
    },
    toggleFavorite(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.isFavorited = !product.isFavorited
      }
    },
    buyNow(product) {
      this.$router.push(`/order/confirm?productId=${product.id}`)
    }
  }
}
</script>