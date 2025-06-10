<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <button @click="$router.go(-1)" class="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-xl font-bold text-blue-600">支付订单</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="paymentStatus === 'pending'" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <!-- 订单信息 -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">订单支付</h2>
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">订单号：</span>
              <span class="font-mono text-gray-900">{{ orderId }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">支付金额：</span>
              <span class="text-2xl font-bold text-red-600">¥{{ amount }}</span>
            </div>
          </div>
        </div>

        <!-- 支付方式 -->
        <div v-if="paymentMethod === 'alipay'" class="space-y-6">
          <div class="flex items-center justify-center space-x-2 mb-4">
            <img src="/placeholder.svg?height=32&width=32" alt="支付宝" class="w-8 h-8">
            <span class="text-lg font-medium">支付宝支付</span>
          </div>
          
          <!-- 二维码 -->
          <div class="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
            <div class="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
              <div class="text-center">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h5.01M4 20h4.01"></path>
                </svg>
                <p class="text-sm text-gray-500">支付二维码</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <p>请使用支付宝扫描上方二维码完成支付</p>
            <p>或者在手机上打开支付宝，搜索"{{ orderId }}"</p>
          </div>
        </div>

        <div v-else-if="paymentMethod === 'wechat'" class="space-y-6">
          <div class="flex items-center justify-center space-x-2 mb-4">
            <img src="/placeholder.svg?height=32&width=32" alt="微信支付" class="w-8 h-8">
            <span class="text-lg font-medium">微信支付</span>
          </div>
          
          <!-- 二维码 -->
          <div class="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
            <div class="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
              <div class="text-center">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h5.01M4 20h4.01"></path>
                </svg>
                <p class="text-sm text-gray-500">支付二维码</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <p>请使用微信扫描上方二维码完成支付</p>
            <p>支付完成后页面将自动跳转</p>
          </div>
        </div>

        <!-- 倒计时 -->
        <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-center justify-center space-x-2 text-yellow-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>请在 {{ formatTime(remainingTime) }} 内完成支付</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-8 flex justify-center space-x-4">
          <button 
            @click="checkPaymentStatus"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            我已完成支付
          </button>
          <button 
            @click="cancelPayment"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            取消支付
          </button>
        </div>
      </div>

      <!-- 支付成功 -->
      <div v-else-if="paymentStatus === 'success'" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">支付成功！</h2>
        <p class="text-gray-600 mb-6">您的订单已支付成功，我们将尽快为您处理</p>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">订单号：</span>
              <span class="font-mono">{{ orderId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">支付金额：</span>
              <span class="font-semibold text-green-600">¥{{ amount }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">支付时间：</span>
              <span>{{ new Date().toLocaleString() }}</span>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center space-x-4">
          <button 
            @click="viewOrder"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            查看订单
          </button>
          <button 
            @click="continueShopping"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            继续购物
          </button>
        </div>
      </div>

      <!-- 支付失败 -->
      <div v-else-if="paymentStatus === 'failed'" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">支付失败</h2>
        <p class="text-gray-600 mb-6">{{ failureReason || '支付过程中出现问题，请重试' }}</p>
        
        <div class="flex justify-center space-x-4">
          <button 
            @click="retryPayment"
            class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            重新支付
          </button>
          <button 
            @click="$router.push('/products')"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            返回商城
          </button>
        </div>
      </div>

      <!-- 支付超时 -->
      <div v-else-if="paymentStatus === 'timeout'" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">支付超时</h2>
        <p class="text-gray-600 mb-6">支付时间已超时，订单已自动取消</p>
        
        <div class="flex justify-center space-x-4">
          <button 
            @click="createNewOrder"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            重新下单
          </button>
          <button 
            @click="$router.push('/products')"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            返回商城
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderPayment',
  data() {
    return {
      paymentStatus: 'pending', // pending, success, failed, timeout
      orderId: '',
      amount: 0,
      paymentMethod: 'alipay',
      remainingTime: 15 * 60, // 15分钟倒计时
      timer: null,
      failureReason: ''
    }
  },
  mounted() {
    // 从路由参数获取订单信息
    this.orderId = this.$route.query.orderId || 'ORD' + Date.now()
    this.amount = parseFloat(this.$route.query.amount) || 0
    this.paymentMethod = this.$route.query.method || 'alipay'
    
    // 开始倒计时
    this.startCountdown()
    
    // 模拟支付状态检查
    this.simulatePaymentCheck()
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    startCountdown() {
      this.timer = setInterval(() => {
        this.remainingTime--
        
        if (this.remainingTime <= 0) {
          this.paymentStatus = 'timeout'
          clearInterval(this.timer)
        }
      }, 1000)
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    },
    checkPaymentStatus() {
      // 模拟检查支付状态
      console.log('检查支付状态...')
      
      // 这里应该调用后端API检查支付状态
      setTimeout(() => {
        // 模拟支付成功
        this.paymentStatus = 'success'
        clearInterval(this.timer)
      }, 1000)
    },
    simulatePaymentCheck() {
      // 模拟自动检查支付状态
      const checkInterval = setInterval(() => {
        if (this.paymentStatus !== 'pending') {
          clearInterval(checkInterval)
          return
        }
        
        // 模拟随机支付成功（用于演示）
        if (Math.random() > 0.95) {
          this.paymentStatus = 'success'
          clearInterval(this.timer)
          clearInterval(checkInterval)
        }
      }, 3000)
    },
    cancelPayment() {
      if (confirm('确定要取消支付吗？')) {
        clearInterval(this.timer)
        this.$router.go(-1)
      }
    },
    retryPayment() {
      this.paymentStatus = 'pending'
      this.remainingTime = 15 * 60
      this.failureReason = ''
      this.startCountdown()
    },
    viewOrder() {
      this.$router.push(`/order/${this.orderId}`)
    },
    continueShopping() {
      this.$router.push('/products')
    },
    createNewOrder() {
      this.$router.push('/order/confirm')
    }
  }
}
</script>