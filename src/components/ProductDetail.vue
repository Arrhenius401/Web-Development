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
            <h1 class="text-xl font-bold text-blue-600">商品详情</h1>
          </div>
          <button @click="$router.push('/products')" class="text-gray-600 hover:text-gray-900">
            返回列表
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧：商品图片 -->
        <div class="space-y-4">
          <!-- 主图 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              :src="selectedImage" 
              :alt="product.title"
              class="w-full h-96 object-cover cursor-zoom-in"
              @click="openImageModal(selectedImage)"
            >
          </div>
          
          <!-- 缩略图 -->
          <div class="flex space-x-2 overflow-x-auto pb-2">
            <img 
              v-for="(image, index) in product.images" 
              :key="index"
              :src="image" 
              :alt="`商品图片${index + 1}`"
              :class="[
                'w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all',
                selectedImage === image ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
              ]"
              @click="selectedImage = image"
            >
          </div>
          
          <!-- 库存状态和卖家信息 -->
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">库存状态：</span>
                <span 
                  :class="[
                    'text-sm font-medium',
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ product.stock > 0 ? `有库存 (${product.stock}件)` : '库存不足' }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <img :src="product.seller.avatar" alt="卖家头像" class="w-10 h-10 rounded-full">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ product.seller.name }}</h4>
                <p class="text-sm text-gray-500">信用分：{{ product.seller.creditScore }}</p>
              </div>
              <button 
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                @click="contactSeller"
              >
                联系卖家
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧：商品信息 -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <!-- 商品基本信息 -->
            <div class="mb-6">
              <div class="flex items-center space-x-2 mb-2">
                <span 
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  ]"
                >
                  {{ getConditionText(product.condition) }}
                </span>
                <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{{ product.category }}</span>
              </div>
              
              <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ product.title }}</h1>
              <div class="text-3xl font-bold text-red-600 mb-4">¥{{ product.price }}</div>
            </div>

            <!-- 商品详细描述 -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-3">商品描述</h3>
              <div class="prose max-w-none text-gray-700">
                <p v-for="(paragraph, index) in product.description" :key="index" class="mb-3">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- 交易操作 -->
            <div class="space-y-4">
              <!-- 数量选择 -->
              <div class="flex items-center space-x-4">
                <span class="text-gray-700">数量：</span>
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    @click="quantity > 1 && quantity--"
                    :disabled="quantity <= 1"
                    class="px-3 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input 
                    v-model.number="quantity" 
                    type="number" 
                    min="1" 
                    :max="product.stock"
                    class="w-16 text-center border-0 focus:ring-0"
                  >
                  <button 
                    @click="quantity < product.stock && quantity++"
                    :disabled="quantity >= product.stock"
                    class="px-3 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span class="text-sm text-gray-500">库存{{ product.stock }}件</span>
              </div>

              <!-- 支付方式 -->
              <div>
                <span class="text-gray-700 mb-2 block">支付方式：</span>
                <div class="flex space-x-4">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" v-model="paymentMethod" value="alipay" class="text-blue-600">
                    <img src="/placeholder.svg?height=24&width=24" alt="支付宝" class="w-6 h-6">
                    <span>支付宝</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" v-model="paymentMethod" value="wechat" class="text-blue-600">
                    <img src="/placeholder.svg?height=24&width=24" alt="微信支付" class="w-6 h-6">
                    <span>微信支付</span>
                  </label>
                </div>
                <div class="mt-2">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" v-model="useEscrow" class="text-blue-600">
                    <span class="text-sm text-gray-600">使用担保交易（推荐）</span>
                  </label>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex space-x-4 pt-4">
                <button 
                  @click="addToCart"
                  class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  加入购物车
                </button>
                <button 
                  @click="buyNow"
                  :disabled="product.stock === 0"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  立即购买
                </button>
              </div>
              
              <button 
                @click="toggleFavorite"
                :class="[
                  'w-full py-2 rounded-lg font-medium transition-colors border',
                  product.isFavorited 
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                ]"
              >
                <svg class="w-4 h-4 inline mr-2" :fill="product.isFavorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {{ product.isFavorited ? '已收藏' : '收藏商品' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 评价模块 -->
      <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">商品评价</h3>
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-green-600">{{ product.rating }}%</span>
            <span class="text-sm text-gray-500">好评率</span>
          </div>
        </div>

        <!-- 评价列表 -->
        <div class="space-y-4">
          <div v-for="review in product.reviews" :key="review.id" class="border-b border-gray-200 pb-4 last:border-b-0">
            <div class="flex items-start space-x-3">
              <img :src="review.user.avatar" alt="用户头像" class="w-10 h-10 rounded-full">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="font-medium text-gray-900">{{ review.user.name }}</span>
                  <div class="flex items-center">
                    <svg v-for="i in 5" :key="i" :class="[
                      'w-4 h-4',
                      i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    ]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-500">{{ review.date }}</span>
                </div>
                <p class="text-gray-700">{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      selectedImage: '',
      quantity: 1,
      paymentMethod: 'alipay',
      useEscrow: true,
      product: {
        id: 1,
        title: 'MacBook Pro 13寸 2021款 M1芯片',
        price: 8500,
        condition: 'like-new',
        category: '数码电子',
        stock: 1,
        rating: 98,
        images: [
          '/placeholder.svg?height=400&width=600',
          '/placeholder.svg?height=400&width=600',
          '/placeholder.svg?height=400&width=600',
          '/placeholder.svg?height=400&width=600'
        ],
        description: [
          '这是一台几乎全新的MacBook Pro，购买后仅使用了3个月，因为工作需要更换更高配置的设备所以出售。',
          '配置：M1芯片，8GB内存，256GB SSD存储，13.3英寸Retina显示屏。',
          '外观完好无损，屏幕无划痕，键盘和触控板使用正常。包装盒、充电器、说明书等配件齐全。',
          '支持面交验货，也可以走闲鱼担保交易，让您买得放心。'
        ],
        seller: {
          name: '数码达人小王',
          avatar: '/placeholder.svg?height=40&width=40',
          creditScore: 95
        },
        isFavorited: false,
        reviews: [
          {
            id: 1,
            user: {
              name: '张三',
              avatar: '/placeholder.svg?height=40&width=40'
            },
            rating: 5,
            content: '商品描述准确，成色很好，卖家人也很nice，推荐！',
            date: '2023-12-01'
          },
          {
            id: 2,
            user: {
              name: '李四',
              avatar: '/placeholder.svg?height=40&width=40'
            },
            rating: 5,
            content: '包装很仔细，物流也很快，商品和描述一致。',
            date: '2023-11-28'
          }
        ]
      }
    }
  },
  mounted() {
    this.selectedImage = this.product.images[0]
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
    openImageModal(image) {
      // 实现图片预览功能
      console.log('打开图片预览:', image)
    },
    contactSeller() {
      // 实现联系卖家功能
      console.log('联系卖家')
    },
    addToCart() {
      console.log('加入购物车', {
        productId: this.product.id,
        quantity: this.quantity
      })
      // 这里可以添加成功提示
    },
    buyNow() {
      this.$router.push({
        path: '/order/confirm',
        query: {
          productId: this.product.id,
          quantity: this.quantity,
          paymentMethod: this.paymentMethod,
          useEscrow: this.useEscrow
        }
      })
    },
    toggleFavorite() {
      this.product.isFavorited = !this.product.isFavorited
    }
  }
}
</script>