<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 头部 -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">社区交易</h1>
        </router-link>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">找回密码</h2>
        <p class="text-gray-600">输入您的邮箱或手机号，我们将发送重置链接</p>
      </div>

      <!-- 找回密码表单 -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div v-if="step === 1">
          <!-- 第一步：输入账号 -->
          <form @submit.prevent="sendResetCode" class="space-y-6">
            <div>
              <label for="account" class="block text-sm font-medium text-gray-700 mb-2">
                邮箱或手机号
              </label>
              <div class="relative">
                <input
                  id="account"
                  v-model="form.account"
                  type="text"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    errors.account ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  ]"
                  placeholder="请输入邮箱或手机号"
                  @blur="validateAccount"
                  @input="clearError('account')"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg v-if="!errors.account && form.account" class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="errors.account" class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <p v-if="errors.account" class="mt-1 text-sm text-red-600">{{ errors.account }}</p>
            </div>

            <!-- 验证码 -->
            <div>
              <label for="captcha" class="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <div class="flex space-x-3">
                <input
                  id="captcha"
                  v-model="form.captcha"
                  type="text"
                  required
                  :class="[
                    'flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    errors.captcha ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  ]"
                  placeholder="请输入验证码"
                  @input="clearError('captcha')"
                >
                <div 
                  @click="refreshCaptcha"
                  class="w-24 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <span class="text-lg font-mono text-gray-600 select-none">{{ captchaCode }}</span>
                </div>
              </div>
              <p v-if="errors.captcha" class="mt-1 text-sm text-red-600">{{ errors.captcha }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading || !isStep1Valid"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? '发送中...' : '发送重置码' }}
            </button>
          </form>
        </div>

        <div v-else-if="step === 2">
          <!-- 第二步：输入重置码 -->
          <form @submit.prevent="verifyResetCode" class="space-y-6">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p class="text-gray-600">
                我们已向 <span class="font-medium text-gray-900">{{ maskedAccount }}</span> 发送了重置码
              </p>
            </div>

            <div>
              <label for="resetCode" class="block text-sm font-medium text-gray-700 mb-2">
                重置码
              </label>
              <input
                id="resetCode"
                v-model="form.resetCode"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg tracking-widest',
                  errors.resetCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="请输入6位重置码"
                maxlength="6"
                @input="clearError('resetCode')"
              >
              <p v-if="errors.resetCode" class="mt-1 text-sm text-red-600">{{ errors.resetCode }}</p>
            </div>

            <div class="flex space-x-3">
              <button
                type="button"
                @click="step = 1"
                class="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                返回
              </button>
              <button
                type="submit"
                :disabled="loading || !form.resetCode"
                class="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? '验证中...' : '验证' }}
              </button>
            </div>

            <div class="text-center">
              <button
                type="button"
                @click="resendCode"
                :disabled="resendCountdown > 0"
                class="text-sm text-purple-600 hover:text-purple-500 disabled:text-gray-400 transition-colors"
              >
                {{ resendCountdown > 0 ? `${resendCountdown}s后可重新发送` : '重新发送重置码' }}
              </button>
            </div>
          </form>
        </div>

        <div v-else-if="step === 3">
          <!-- 第三步：重置密码 -->
          <form @submit.prevent="resetPassword" class="space-y-6">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-gray-600">验证成功，请设置新密码</p>
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                新密码
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="form.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12',
                    errors.newPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  ]"
                  placeholder="请输入新密码"
                  @blur="validateNewPassword"
                  @input="clearError('newPassword')"
                >
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg v-if="showNewPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>
              <p v-if="errors.newPassword" class="mt-1 text-sm text-red-600">{{ errors.newPassword }}</p>
            </div>

            <div>
              <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 mb-2">
                确认新密码
              </label>
              <div class="relative">
                <input
                  id="confirmNewPassword"
                  v-model="form.confirmNewPassword"
                  :type="showConfirmNewPassword ? 'text' : 'password'"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12',
                    errors.confirmNewPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  ]"
                  placeholder="请再次输入新密码"
                  @blur="validateConfirmNewPassword"
                  @input="clearError('confirmNewPassword')"
                >
                <button
                  type="button"
                  @click="showConfirmNewPassword = !showConfirmNewPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg v-if="showConfirmNewPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmNewPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmNewPassword }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading || !isStep3Valid"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? '重置中...' : '重置密码' }}
            </button>
          </form>
        </div>

        <!-- 返回登录 -->
        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            返回登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      step: 1,
      form: {
        account: '',
        captcha: '',
        resetCode: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      errors: {},
      loading: false,
      captchaCode: '',
      resendCountdown: 0
    }
  },
  computed: {
    isStep1Valid() {
      return this.form.account && 
             this.form.captcha && 
             Object.keys(this.errors).length === 0
    },
    isStep3Valid() {
      return this.form.newPassword && 
             this.form.confirmNewPassword && 
             Object.keys(this.errors).length === 0
    },
    maskedAccount() {
      const account = this.form.account
      if (!account) return ''
      
      if (account.includes('@')) {
        // 邮箱脱敏
        const [username, domain] = account.split('@')
        const maskedUsername = username.length > 2 
          ? username.substring(0, 2) + '*'.repeat(username.length - 2)
          : username
        return `${maskedUsername}@${domain}`
      } else {
        // 手机号脱敏
        return account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    }
  },
  mounted() {
    this.refreshCaptcha()
  },
  methods: {
    validateAccount() {
      const account = this.form.account.trim()
      if (!account) {
        this.errors.account = '请输入邮箱或手机号'
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRegex = /^1[3-9]\d{9}$/
      
      if (!emailRegex.test(account) && !phoneRegex.test(account)) {
        this.errors.account = '请输入正确的邮箱或手机号'
        return false
      }
      
      delete this.errors.account
      return true
    },
    
    validateNewPassword() {
      const password = this.form.newPassword
      if (!password) {
        this.errors.newPassword = '请输入新密码'
        return false
      }
      
      if (password.length < 6) {
        this.errors.newPassword = '密码长度不能少于6位'
        return false
      }
      
      delete this.errors.newPassword
      return true
    },
    
    validateConfirmNewPassword() {
      const confirmPassword = this.form.confirmNewPassword
      if (!confirmPassword) {
        this.errors.confirmNewPassword = '请确认新密码'
        return false
      }
      
      if (confirmPassword !== this.form.newPassword) {
        this.errors.confirmNewPassword = '两次输入的密码不一致'
        return false
      }
      
      delete this.errors.confirmNewPassword
      return true
    },
    
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }
    },
    
    refreshCaptcha() {
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let result = ''
      for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.captchaCode = result
    },
    
    async sendResetCode() {
      if (!this.validateAccount()) return
      
      if (!this.form.captcha) {
        this.errors.captcha = '请输入验证码'
        return
      }
      
      if (this.form.captcha.toLowerCase() !== this.captchaCode.toLowerCase()) {
        this.errors.captcha = '验证码错误'
        return
      }
      
      this.loading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        this.step = 2
        this.startResendCountdown()
        
        this.$parent.showToast({
          type: 'success',
          title: '重置码已发送',
          message: '请查收您的邮箱或短信'
        })
      } catch (error) {
        this.$parent.showToast({
          type: 'error',
          title: '发送失败',
          message: '重置码发送失败，请稍后重试'
        })
      } finally {
        this.loading = false
      }
    },
    
    async verifyResetCode() {
      if (!this.form.resetCode) {
        this.errors.resetCode = '请输入重置码'
        return
      }
      
      if (this.form.resetCode.length !== 6) {
        this.errors.resetCode = '重置码应为6位'
        return
      }
      
      this.loading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 模拟验证成功
        this.step = 3
        
        this.$parent.showToast({
          type: 'success',
          title: '验证成功',
          message: '请设置新密码'
        })
      } catch (error) {
        this.errors.resetCode = '重置码错误或已过期'
      } finally {
        this.loading = false
      }
    },
    
    async resetPassword() {
      if (!this.validateNewPassword() || !this.validateConfirmNewPassword()) {
        return
      }
      
      this.loading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        this.$parent.showToast({
          type: 'success',
          title: '密码重置成功',
          message: '请使用新密码登录'
        })
        
        this.$router.push('/login')
      } catch (error) {
        this.$parent.showToast({
          type: 'error',
          title: '重置失败',
          message: '密码重置失败，请稍后重试'
        })
      } finally {
        this.loading = false
      }
    },
    
    async resendCode() {
      this.loading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.startResendCountdown()
        
        this.$parent.showToast({
          type: 'success',
          title: '重置码已重新发送',
          message: '请查收您的邮箱或短信'
        })
      } catch (error) {
        this.$parent.showToast({
          type: 'error',
          title: '发送失败',
          message: '重置码发送失败，请稍后重试'
        })
      } finally {
        this.loading = false
      }
    },
    
    startResendCountdown() {
      this.resendCountdown = 60
      const timer = setInterval(() => {
        this.resendCountdown--
        if (this.resendCountdown <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>