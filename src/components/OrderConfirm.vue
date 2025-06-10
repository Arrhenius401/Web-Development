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
            <h1 class="text-xl font-bold text-blue-600">确认订单</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6">
        <!-- 收货地址 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">收货地址</h3>
            <button 
              @click="showAddressModal = true"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              新增地址
            </button>
          </div>
          
          <div v-if="selectedAddress" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="font-medium text-gray-900">{{ selectedAddress.name }}</span>
                  <span class="text-gray-600">{{ selectedAddress.phone }}</span>
                  <span v-if="selectedAddress.isDefault" class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">默认</span>
                </div>
                <p class="text-gray-600">{{ selectedAddress.fullAddress }}</p>
              </div>
              <button 
                @click="showAddressList = true"
                class="text-blue-600 hover:text-blue-700 text-sm"
              >
                更换
              </button>
            </div>
          </div>
          
          <div v-else class="text-center py-8">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p class="text-gray-500 mb-4">请添加收货地址</p>
            <button 
              @click="showAddressModal = true"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              添加地址
            </button>
          </div>
        </div>

        <!-- 商品清单 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">商品清单</h3>
          
          <div class="space-y-4">
            <div v-for="item in orderItems" :key="item.id" class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded-lg">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ item.title }}</h4>
                <p class="text-sm text-gray-500">{{ item.condition }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-red-600 font-semibold">¥{{ item.price }}</span>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                      class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span class="w-8 text-center">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button 
                @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-700 p-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div v-if="orderItems.length > 1" class="mt-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-700">
              共 {{ totalItems }} 件商品，来自 {{ uniqueSellers }} 个卖家
            </p>
          </div>
        </div>

        <!-- 支付信息 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">支付信息</h3>
          
          <!-- 费用明细 -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">商品总价</span>
              <span class="text-gray-900">¥{{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">运费</span>
              <span class="text-gray-900">¥{{ shippingFee }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">服务费</span>
              <span class="text-gray-900">¥{{ serviceFee }}</span>
            </div>
            <div class="border-t pt-3">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-900">合计金额</span>
                <span class="text-2xl font-bold text-red-600">¥{{ totalAmount }}</span>
              </div>
            </div>
          </div>

          <!-- 支付方式选择 -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 mb-3">支付方式</h4>
            <div class="space-y-3">
              <label 
                v-for="method in paymentMethods" 
                :key="method.value"
                class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="{ 'border-blue-500 bg-blue-50': selectedPaymentMethod === method.value }"
              >
                <input 
                  type="radio" 
                  :value="method.value" 
                  v-model="selectedPaymentMethod"
                  class="text-blue-600"
                >
                <img :src="method.icon" :alt="method.label" class="w-8 h-8">
                <div class="flex-1">
                  <span class="font-medium text-gray-900">{{ method.label }}</span>
                  <p class="text-sm text-gray-500">{{ method.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- 担保交易选项 -->
          <div class="mb-6">
            <label class="flex items-start space-x-3">
              <input type="checkbox" v-model="useEscrow" class="mt-1 text-blue-600">
              <div>
                <span class="font-medium text-gray-900">使用担保交易</span>
                <p class="text-sm text-gray-500">平台将暂时保管您的付款，确认收货后再转给卖家，更安全可靠</p>
              </div>
            </label>
          </div>

          <!-- 提交订单按钮 -->
          <button 
            @click="submitOrder"
            :disabled="!canSubmit"
            class="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交订单并支付 ¥{{ totalAmount }}
          </button>
        </div>
      </div>
    </div>

    <!-- 地址选择弹窗 -->
    <div v-if="showAddressList" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showAddressList = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">选择收货地址</h3>
          <button @click="showAddressList = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div 
            v-for="address in addresses" 
            :key="address.id"
            class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            :class="{ 'border-blue-500 bg-blue-50': selectedAddress?.id === address.id }"
            @click="selectAddress(address)"
          >
            <div class="flex items-center space-x-2 mb-1">
              <span class="font-medium">{{ address.name }}</span>
              <span class="text-gray-600">{{ address.phone }}</span>
              <span v-if="address.isDefault" class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">默认</span>
            </div>
            <p class="text-gray-600 text-sm">{{ address.fullAddress }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增地址弹窗 -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showAddressModal = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">新增收货地址</h3>
          <button @click="showAddressModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="addAddress" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">收货人</label>
            <input 
              type="text" 
              v-model="newAddress.name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
            <input 
              type="tel" 
              v-model="newAddress.phone"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">详细地址</label>
            <textarea 
              v-model="newAddress.address"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
          
          <div>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="newAddress.isDefault" class="text-blue-600">
              <span class="text-sm text-gray-700">设为默认地址</span>
            </label>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="button"
              @click="showAddressModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button 
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirm',
  data() {
    return {
      showAddressList: false,
      showAddressModal: false,
      selectedAddress: null,
      selectedPaymentMethod: 'alipay',
      useEscrow: true,
      orderItems: [
        {
          id: 1,
          title: 'MacBook Pro 13寸 2021款 M1芯片',
          price: 8500,
          quantity: 1,
          condition: '几乎全新',
          image: '/placeholder.svg?height=64&width=64',
          sellerId: 1
        }
      ],
      addresses: [
        {
          id: 1,
          name: '张三',
          phone: '138****8888',
          fullAddress: '北京市朝阳区三里屯街道工体北路8号院1号楼101室',
          isDefault: true
        },
        {
          id: 2,
          name: '李四',
          phone: '139****9999',
          fullAddress: '上海市浦东新区陆家嘴街道世纪大道100号环球金融中心',
          isDefault: false
        }
      ],
      newAddress: {
        name: '',
        phone: '',
        address: '',
        isDefault: false
      },
      paymentMethods: [
        {
          value: 'alipay',
          label: '支付宝',
          description: '推荐使用，支持花呗分期',
          icon: '/placeholder.svg?height=32&width=32'
        },
        {
          value: 'wechat',
          label: '微信支付',
          description: '微信安全支付',
          icon: '/placeholder.svg?height=32&width=32'
        },
        {
          value: 'unionpay',
          label: '银联支付',
          description: '银行卡直接支付',
          icon: '/placeholder.svg?height=32&width=32'
        }
      ],
      shippingFee: 15,
      serviceFee: 5
    }
  },
  computed: {
    subtotal() {
      return this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    totalItems() {
      return this.orderItems.reduce((sum, item) => sum + item.quantity, 0)
    },
    uniqueSellers() {
      return new Set(this.orderItems.map(item => item.sellerId)).size
    },
    totalAmount() {
      return this.subtotal + this.shippingFee + this.serviceFee
    },
    canSubmit() {
      return this.selectedAddress && this.selectedPaymentMethod && this.orderItems.length > 0
    }
  },
  mounted() {
    // 设置默认地址
    this.selectedAddress = this.addresses.find(addr => addr.isDefault) || this.addresses[0]
    
    // 从路由参数获取商品信息
    const productId = this.$route.query.productId
    const quantity = parseInt(this.$route.query.quantity) || 1
    
    if (productId) {
      // 这里应该从API获取商品信息
      console.log('加载商品信息:', { productId, quantity })
    }
  },
  methods: {
    selectAddress(address) {
      this.selectedAddress = address
      this.showAddressList = false
    },
    addAddress() {
      const address = {
        id: Date.now(),
        name: this.newAddress.name,
        phone: this.newAddress.phone,
        fullAddress: this.newAddress.address,
        isDefault: this.newAddress.isDefault
      }
      
      // 如果设为默认，取消其他地址的默认状态
      if (address.isDefault) {
        this.addresses.forEach(addr => addr.isDefault = false)
      }
      
      this.addresses.push(address)
      this.selectedAddress = address
      this.showAddressModal = false
      
      // 重置表单
      this.newAddress = {
        name: '',
        phone: '',
        address: '',
        isDefault: false
      }
    },
    updateQuantity(itemId, newQuantity) {
      if (newQuantity < 1) return
      
      const item = this.orderItems.find(item => item.id === itemId)
      if (item) {
        item.quantity = newQuantity
      }
    },
    removeItem(itemId) {
      this.orderItems = this.orderItems.filter(item => item.id !== itemId)
    },
    submitOrder() {
      if (!this.canSubmit) return
      
      const orderData = {
        items: this.orderItems,
        address: this.selectedAddress,
        paymentMethod: this.selectedPaymentMethod,
        useEscrow: this.useEscrow,
        totalAmount: this.totalAmount
      }
      
      console.log('提交订单:', orderData)
      
      // 跳转到支付页面
      this.$router.push({
        path: '/payment',
        query: {
          orderId: Date.now(),
          amount: this.totalAmount,
          method: this.selectedPaymentMethod
        }
      })
    }
  }
}
</script>