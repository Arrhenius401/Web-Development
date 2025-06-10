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
            <h1 class="text-xl font-bold text-blue-600">订单详情</h1>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="contactSeller"
              class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              联系卖家
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 订单状态 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">订单状态</h2>
          <span :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            getStatusColor(order.status)
          ]">
            {{ getStatusText(order.status) }}
          </span>
        </div>
        
        <!-- 订单进度 -->
        <div class="relative">
          <div class="flex items-center justify-between">
            <div 
              v-for="(step, index) in orderSteps" 
              :key="step.key"
              class="flex flex-col items-center relative"
              :class="{ 'flex-1': index < orderSteps.length - 1 }"
            >
              <!-- 步骤图标 -->
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2',
                isStepCompleted(step.key) 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : isStepCurrent(step.key)
                  ? 'bg-blue-100 border-blue-500 text-blue-600'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              ]">
                <svg v-if="isStepCompleted(step.key)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
              </div>
              
              <!-- 步骤标题 -->
              <span :class="[
                'text-sm text-center',
                isStepCompleted(step.key) || isStepCurrent(step.key) 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500'
              ]">
                {{ step.title }}
              </span>
              
              <!-- 步骤时间 -->
              <span v-if="step.time" class="text-xs text-gray-400 mt-1">
                {{ formatDateTime(step.time) }}
              </span>
              
              <!-- 连接线 -->
              <div 
                v-if="index < orderSteps.length - 1"
                :class="[
                  'absolute top-5 left-1/2 w-full h-0.5 -z-10',
                  isStepCompleted(orderSteps[index + 1].key) ? 'bg-blue-500' : 'bg-gray-300'
                ]"
                style="transform: translateX(50%)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 物流信息 -->
      <div v-if="order.logistics" class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">物流信息</h3>
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="font-medium text-gray-900">{{ order.logistics.company }}</span>
              <span class="ml-2 text-gray-600">{{ order.logistics.trackingNumber }}</span>
            </div>
            <button 
              @click="trackPackage"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              查看物流
            </button>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="(record, index) in order.logistics.records" 
              :key="index"
              class="flex space-x-3"
            >
              <div :class="[
                'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                index === 0 ? 'bg-blue-500' : 'bg-gray-300'
              ]"></div>
              <div class="flex-1">
                <p class="text-gray-900">{{ record.description }}</p>
                <p class="text-sm text-gray-500">{{ formatDateTime(record.time) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">商品信息</h3>
        <div class="space-y-4">
          <div 
            v-for="item in order.items" 
            :key="item.id"
            class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
          >
            <img :src="item.image" :alt="item.title" class="w-20 h-20 object-cover rounded-lg">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 mb-1">{{ item.title }}</h4>
              <p class="text-sm text-gray-500 mb-2">{{ item.condition }}</p>
              <div class="flex items-center justify-between">
                <span class="text-red-600 font-semibold">¥{{ item.price }}</span>
                <span class="text-gray-500">x{{ item.quantity }}</span>
              </div>
            </div>
            <div class="text-right">
              <button 
                @click="$router.push(`/product/${item.productId}`)"
                class="text-blue-600 hover:text-blue-700 text-sm"
              >
                查看商品
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 订单信息 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">订单信息</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 基本信息 -->
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">订单号：</span>
              <span class="font-mono text-gray-900">{{ order.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">下单时间：</span>
              <span class="text-gray-900">{{ formatDateTime(order.createdAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">支付方式：</span>
              <span class="text-gray-900">{{ getPaymentMethodText(order.paymentMethod) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">担保交易：</span>
              <span class="text-gray-900">{{ order.useEscrow ? '是' : '否' }}</span>
            </div>
          </div>
          
          <!-- 收货信息 -->
          <div class="space-y-3">
            <div>
              <span class="text-gray-600 block mb-1">收货地址：</span>
              <div class="text-gray-900">
                <p>{{ order.address.name }} {{ order.address.phone }}</p>
                <p>{{ order.address.fullAddress }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 费用明细 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">费用明细</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">商品总价</span>
            <span class="text-gray-900">¥{{ order.subtotal }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">运费</span>
            <span class="text-gray-900">¥{{ order.shippingFee }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">服务费</span>
            <span class="text-gray-900">¥{{ order.serviceFee }}</span>
          </div>
          <div class="border-t pt-3">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900">实付金额</span>
              <span class="text-2xl font-bold text-red-600">¥{{ order.totalAmount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-wrap gap-3">
          <button 
            v-if="order.status === 'shipped'"
            @click="confirmReceipt"
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            确认收货
          </button>
          
          <button 
            v-if="order.status === 'completed'"
            @click="rateOrder"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            评价订单
          </button>
          
          <button 
            v-if="canCancel"
            @click="cancelOrder"
            class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            取消订单
          </button>
          
          <button 
            v-if="canRefund"
            @click="requestRefund"
            class="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            申请退款
          </button>
          
          <button 
            @click="downloadInvoice"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            下载发票
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data() {
    return {
      order: {
        id: 'ORD202312150001',
        status: 'shipped',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        paymentMethod: 'alipay',
        useEscrow: true,
        subtotal: 8500,
        shippingFee: 15,
        serviceFee: 5,
        totalAmount: 8520,
        address: {
          name: '张三',
          phone: '138****8888',
          fullAddress: '北京市朝阳区三里屯街道工体北路8号院1号楼101室'
        },
        items: [
          {
            id: 1,
            productId: 1,
            title: 'MacBook Pro 13寸 2021款 M1芯片',
            price: 8500,
            quantity: 1,
            condition: '几乎全新',
            image: '/placeholder.svg?height=80&width=80'
          }
        ],
        logistics: {
          company: '顺丰速运',
          trackingNumber: 'SF1234567890',
          records: [
            {
              description: '快件已到达【北京朝阳区三里屯营业点】',
              time: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
              description: '快件正在派送中，派送员：张师傅，联系电话：138****1234',
              time: new Date(Date.now() - 4 * 60 * 60 * 1000)
            },
            {
              description: '快件已到达【北京转运中心】',
              time: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            {
              description: '快件已从【上海转运中心】发出',
              time: new Date(Date.now() - 36 * 60 * 60 * 1000)
            }
          ]
        }
      },
      orderSteps: [
        { key: 'paid', title: '已支付', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { key: 'shipped', title: '已发货', time: new Date(Date.now() - 36 * 60 * 60 * 1000) },
        { key: 'delivered', title: '已送达', time: null },
        { key: 'completed', title: '已完成', time: null }
      ]
    }
  },
  computed: {
    canCancel() {
      return ['pending', 'paid'].includes(this.order.status)
    },
    canRefund() {
      return ['shipped', 'delivered'].includes(this.order.status)
    }
  },
  mounted() {
    // 从路由参数获取订单ID
    const orderId = this.$route.params.id
    if (orderId) {
      this.loadOrderDetail(orderId)
    }
  },
  methods: {
    loadOrderDetail(orderId) {
      // 这里应该从API加载订单详情
      console.log('加载订单详情:', orderId)
    },
    getStatusText(status) {
      const statusMap = {
        'pending': '待支付',
        'paid': '已支付',
        'shipped': '已发货',
        'delivered': '已送达',
        'completed': '已完成',
        'cancelled': '已取消',
        'refunded': '已退款'
      }
      return statusMap[status] || status
    },
    getStatusColor(status) {
      const colorMap = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'paid': 'bg-blue-100 text-blue-800',
        'shipped': 'bg-purple-100 text-purple-800',
        'delivered': 'bg-green-100 text-green-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800',
        'refunded': 'bg-gray-100 text-gray-800'
      }
      return colorMap[status] || 'bg-gray-100 text-gray-800'
    },
    getPaymentMethodText(method) {
      const methodMap = {
        'alipay': '支付宝',
        'wechat': '微信支付',
        'unionpay': '银联支付'
      }
      return methodMap[method] || method
    },
    isStepCompleted(stepKey) {
      const stepOrder = ['paid', 'shipped', 'delivered', 'completed']
      const currentIndex = stepOrder.indexOf(this.order.status)
      const stepIndex = stepOrder.indexOf(stepKey)
      return stepIndex <= currentIndex
    },
    isStepCurrent(stepKey) {
      return stepKey === this.order.status
    },
    formatDateTime(date) {
      if (!date) return ''
      return new Date(date).toLocaleString('zh-CN')
    },
    contactSeller() {
      this.$router.push('/chat')
    },
    trackPackage() {
      // 打开物流跟踪页面
      window.open(`https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/${this.order.logistics.trackingNumber}`)
    },
    confirmReceipt() {
      if (confirm('确认已收到商品吗？确认后将无法申请退款。')) {
        this.order.status = 'completed'
        console.log('确认收货')
      }
    },
    rateOrder() {
      // 跳转到评价页面
      this.$router.push(`/order/${this.order.id}/rate`)
    },
    cancelOrder() {
      if (confirm('确定要取消订单吗？')) {
        this.order.status = 'cancelled'
        console.log('取消订单')
      }
    },
    requestRefund() {
      // 跳转到退款申请页面
      this.$router.push(`/order/${this.order.id}/refund`)
    },
    downloadInvoice() {
      // 下载发票
      console.log('下载发票')
    }
  }
}
</script>