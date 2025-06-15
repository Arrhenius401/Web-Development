<template>
  <!-- 认证模态框 -->
  <div 
    v-if="visible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="close"
  >
    <div 
      class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ mode === 'login' ? '登录账户' : '创建账户' }}
        </h3>
        <button 
          @click="close"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 内容 -->
      <div class="p-6">
        <!-- 登录表单 -->
        <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              邮箱或手机号
            </label>
            <input
              v-model="loginForm.account"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入邮箱或手机号"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <div class="relative">
              <input
                v-model="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="请输入密码"
              >
              <button
                type="button"
                @click="showLoginPassword = !showLoginPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showLoginPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="loginForm.remember"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <span class="ml-2 text-sm text-gray-700">记住我</span>
            </label>
            <button
              type="button"
              @click="$router.push('/forgot-password'); close()"
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              忘记密码？
            </button>
          </div>
          
          <button
            type="submit"
            :disabled="loginLoading"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {{ loginLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <!-- 注册表单 -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              用户名
            </label>
            <input
              v-model="registerForm.username"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入用户名"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              邮箱
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入邮箱"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <div class="relative">
              <input
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="请输入密码"
              >
              <button
                type="button"
                @click="showRegisterPassword = !showRegisterPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showRegisterPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="flex items-start">
            <input
              v-model="registerForm.agreement"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            >
            <label class="ml-2 block text-sm text-gray-700">
              我已阅读并同意
              <a href="#" class="text-blue-600 hover:text-blue-500">《用户协议》</a>
              和
              <a href="#" class="text-blue-600 hover:text-blue-500">《隐私政策》</a>
            </label>
          </div>
          
          <button
            type="submit"
            :disabled="registerLoading"
            class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {{ registerLoading ? '注册中...' : '注册' }}
          </button>
        </form>

        <!-- 第三方登录 -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">或者使用</span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-3">
            <button class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
              </svg>
              <span class="ml-2">微信</span>
            </button>

            <button class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              <span class="ml-2">QQ</span>
            </button>
          </div>
        </div>

        <!-- 切换模式 -->
        <div class="mt-6 text-center">
          <span class="text-gray-600">
            {{ mode === 'login' ? '还没有账户？' : '已有账户？' }}
          </span>
          <button
            @click="toggleMode"
            class="ml-1 text-blue-600 hover:text-blue-500 font-medium"
          >
            {{ mode === 'login' ? '立即注册' : '立即登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    initialMode: {
      type: String,
      default: 'login',
      validator: value => ['login', 'register'].includes(value)
    }
  },
  data() {
    return {
      mode: this.initialMode,
      loginForm: {
        account: '',
        password: '',
        remember: false
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        agreement: false
      },
      showLoginPassword: false,
      showRegisterPassword: false,
      loginLoading: false,
      registerLoading: false
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.mode = this.initialMode
        this.resetForms()
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    
    toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login'
      this.resetForms()
    },
    
    resetForms() {
      this.loginForm = {
        account: '',
        password: '',
        remember: false
      }
      this.registerForm = {
        username: '',
        email: '',
        password: '',
        agreement: false
      }
      this.showLoginPassword = false
      this.showRegisterPassword = false
    },
    
    async handleLogin() {
      this.loginLoading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 模拟登录成功
        localStorage.setItem('userToken', 'mock-token')
        localStorage.setItem('userInfo', JSON.stringify({
          id: 1,
          username: 'testuser',
          email: this.loginForm.account,
          avatar: '/placeholder.svg?height=40&width=40'
        }))
        
        this.$emit('login-success')
        this.close()
        
        this.$parent.showToast({
          type: 'success',
          title: '登录成功',
          message: '欢迎回来！'
        })
      } catch (error) {
        this.$parent.showToast({
          type: 'error',
          title: '登录失败',
          message: '用户名或密码错误'
        })
      } finally {
        this.loginLoading = false
      }
    },
    
    async handleRegister() {
      this.registerLoading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        this.$parent.showToast({
          type: 'success',
          title: '注册成功',
          message: '欢迎加入我们的社区！'
        })
        
        // 注册成功后自动登录
        localStorage.setItem('userToken', 'mock-token')
        localStorage.setItem('userInfo', JSON.stringify({
          id: 1,
          username: this.registerForm.username,
          email: this.registerForm.email,
          avatar: '/placeholder.svg?height=40&width=40'
        }))
        
        this.$emit('register-success')
        this.close()
      } catch (error) {
        this.$parent.showToast({
          type: 'error',
          title: '注册失败',
          message: '注册过程中出现错误，请稍后重试'
        })
      } finally {
        this.registerLoading = false
      }
    }
  }
}
</script>