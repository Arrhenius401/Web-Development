<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 头部 -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">社区交易</h1>
        </router-link>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">创建账户</h2>
        <p class="text-gray-600">加入我们的社区，开始您的交易之旅</p>
      </div>

      <!-- 注册表单 -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- 用户名 -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <div class="relative">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                  errors.username ? 'border-red-300 bg-red-50' : 
                  form.username && !errors.username ? 'border-green-300 bg-green-50' : 'border-gray-300'
                ]"
                placeholder="请输入用户名"
                @blur="validateUsername"
                @input="clearError('username')"
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg v-if="!errors.username && form.username && usernameChecked" class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else-if="errors.username" class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <svg v-else-if="checkingUsername" class="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
            <p v-else-if="form.username && !errors.username" class="mt-1 text-sm text-gray-500">
              用户名长度3-20位，只能包含字母、数字和下划线
            </p>
          </div>

          <!-- 邮箱 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              邮箱地址
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                  errors.email ? 'border-red-300 bg-red-50' : 
                  form.email && !errors.email ? 'border-green-300 bg-green-50' : 'border-gray-300'
                ]"
                placeholder="请输入邮箱地址"
                @blur="validateEmail"
                @input="clearError('email')"
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg v-if="!errors.email && form.email" class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else-if="errors.email" class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- 手机号 -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              手机号码
            </label>
            <div class="flex space-x-3">
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                :class="[
                  'flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                  errors.phone ? 'border-red-300 bg-red-50' : 
                  form.phone && !errors.phone ? 'border-green-300 bg-green-50' : 'border-gray-300'
                ]"
                placeholder="请输入手机号码"
                @blur="validatePhone"
                @input="clearError('phone')"
              >
              <button
                type="button"
                @click="sendSmsCode"
                :disabled="!form.phone || errors.phone || smsCountdown > 0"
                class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {{ smsCountdown > 0 ? `${smsCountdown}s` : '发送验证码' }}
              </button>
            </div>
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- 短信验证码 -->
          <div v-if="smsSent">
            <label for="smsCode" class="block text-sm font-medium text-gray-700 mb-2">
              短信验证码
            </label>
            <input
              id="smsCode"
              v-model="form.smsCode"
              type="text"
              required
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                errors.smsCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
              ]"
              placeholder="请输入6位验证码"
              maxlength="6"
              @input="clearError('smsCode')"
            >
            <p v-if="errors.smsCode" class="mt-1 text-sm text-red-600">{{ errors.smsCode }}</p>
          </div>

          <!-- 密码 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12',
                  errors.password ? 'border-red-300 bg-red-50' : 
                  form.password && !errors.password ? 'border-green-300 bg-green-50' : 'border-gray-300'
                ]"
                placeholder="请输入密码"
                @blur="validatePassword"
                @input="clearError('password')"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            
            <!-- 密码强度指示器 -->
            <div v-if="form.password" class="mt-2">
              <div class="flex space-x-1">
                <div 
                  v-for="i in 4" 
                  :key="i"
                  :class="[
                    'h-1 flex-1 rounded',
                    i <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200'
                  ]"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                密码强度：{{ getStrengthText(passwordStrength) }}
              </p>
            </div>
          </div>

          <!-- 确认密码 -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              确认密码
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12',
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 
                  form.confirmPassword && !errors.confirmPassword ? 'border-green-300 bg-green-50' : 'border-gray-300'
                ]"
                placeholder="请再次输入密码"
                @blur="validateConfirmPassword"
                @input="clearError('confirmPassword')"
              >
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- 服务条款 -->
          <div class="flex items-start">
            <input
              id="agreement"
              v-model="form.agreement"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            >
            <label for="agreement" class="ml-2 block text-sm text-gray-700">
              我已阅读并同意
              <a href="#" class="text-blue-600 hover:text-blue-500">《用户协议》</a>
              和
              <a href="#" class="text-blue-600 hover:text-blue-500">《隐私政策》</a>
            </label>
          </div>

          <!-- 注册按钮 -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? '注册中...' : '创建账户' }}
          </button>
        </form>

        <!-- 登录链接 -->
        <div class="mt-6 text-center">
          <span class="text-gray-600">已有账户？</span>
          <router-link
            to="/login"
            class="ml-1 text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            立即登录
          </router-link>
        </div>
      </div>

      <!-- 成功/错误信息提示 -->
      <div v-if="message.text" :class="[
        'rounded-lg p-4 text-sm',
        message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
      ]">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg v-if="message.type === 'success'" class="h-5 w-5 text-green-400" fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { registerDefaultUser } from '../services/api'

export default {
  name: 'UserRegister',
  data() {
    return {
      form: {
        username: '',
        email: '',
        phone: '',
        smsCode: '',
        password: '',
        confirmPassword: '',
        agreement: false
      },message: {
        text: '',
        type: ''  //'success' or 'error'
      },
      errors: {},
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      checkingUsername: false,
      usernameChecked: false,
      smsSent: false,
      smsCountdown: 0
    }
  },
  computed: {
    isFormValid() {
      return this.form.username && 
             this.form.email && 
             this.form.phone && 
             this.form.password && 
             this.form.confirmPassword &&
             this.form.agreement &&
             (!this.smsSent || this.form.smsCode) &&
             Object.keys(this.errors).length === 0
    },
    passwordStrength() {
      const password = this.form.password
      if (!password) return 0
      
      let strength = 0
      if (password.length >= 8) strength++
      if (/[a-z]/.test(password)) strength++
      if (/[A-Z]/.test(password)) strength++
      if (/[0-9]/.test(password)) strength++
      if (/[^A-Za-z0-9]/.test(password)) strength++
      
      return Math.min(strength, 4)
    }
  },
  methods: {
    async validateUsername() {
      const username = this.form.username.trim()
      if (!username) {
        this.errors.username = '请输入用户名'
        return false
      }
      
      if (username.length < 3 || username.length > 20) {
        this.errors.username = '用户名长度应在3-20位之间'
        return false
      }
      
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        this.errors.username = '用户名只能包含字母、数字和下划线'
        return false
      }
      
      // 可用于检查用户名是否已存在
      this.checkingUsername = true
      //新增
      delete this.errors.username
      this.usernameChecked = true
      this.checkingUsername = false
      
      return !this.errors.username
    },
    
    validateEmail() {
      const email = this.form.email.trim()
      if (!email) {
        this.errors.email = '请输入邮箱地址'
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.errors.email = '请输入正确的邮箱地址'
        return false
      }
      
      delete this.errors.email
      return true
    },
    
    validatePhone() {
      const phone = this.form.phone.trim()
      if (!phone) {
        this.errors.phone = '请输入手机号码'
        return false
      }
      
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(phone)) {
        this.errors.phone = '请输入正确的手机号码'
        return false
      }
      
      delete this.errors.phone
      return true
    },
    
    validatePassword() {
      const password = this.form.password
      if (!password) {
        this.errors.password = '请输入密码'
        return false
      }
      
      if (password.length < 6) {
        this.errors.password = '密码长度不能少于6位'
        return false
      }
      
      if (password.length > 50) {
        this.errors.password = '密码长度不能超过50位'
        return false
      }
      
      delete this.errors.password
      return true
    },
    
    validateConfirmPassword() {
      const confirmPassword = this.form.confirmPassword
      if (!confirmPassword) {
        this.errors.confirmPassword = '请确认密码'
        return false
      }
      
      if (confirmPassword !== this.form.password) {
        this.errors.confirmPassword = '两次输入的密码不一致'
        return false
      }
      
      delete this.errors.confirmPassword
      return true
    },
    
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }
    },
    
    async sendSmsCode() {
      if (!this.validatePhone()) return
      
      try {
        // 模拟发送短信验证码
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.smsSent = true
        this.smsCountdown = 60
        
        const timer = setInterval(() => {
          this.smsCountdown--
          if (this.smsCountdown <= 0) {
            clearInterval(timer)
          }
        }, 1000)
        
        this.$parent.showToast({
          type: 'success',
          title: '验证码已发送',
          message: '请查收短信验证码'
        })
      } catch (error) {
        this.$parent.showToast({
          type: 'error',
          title: '发送失败',
          message: '短信验证码发送失败，请稍后重试'
        })
      }
    },
    
    getStrengthColor(strength) {
      const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400']
      return colors[strength - 1] || 'bg-gray-200'
    },
    
    getStrengthText(strength) {
      const texts = ['弱', '一般', '中等', '强']
      return texts[strength - 1] || '无'
    },
    
    async handleRegister() {
      // 验证所有字段
      const validations = [
        this.validateUsername(),
        this.validateEmail(),
        this.validatePhone(),
        this.validatePassword(),
        this.validateConfirmPassword()
      ]

      // 清除之前的消息
      this.message.text = ''
      
      const results = await Promise.all(validations)
      if (!results.every(result => result)) {
        return
      }
      
      if (this.smsSent && !this.form.smsCode) {
        this.errors.smsCode = '请输入短信验证码'
        return
      }
      
      if (!this.form.agreement) {
        this.$parent.showToast({
          type: 'warning',
          title: '请同意用户协议',
          message: '请阅读并同意用户协议和隐私政策'
        })
        return
      }
      
      this.loading = true
      
      try {
        let response = ''
        response = await registerDefaultUser(this.form.username, this.form.email, this.form.phone, this.form.password)

        
        //处理登录结果
        if(response === "ok"){
          //登录成功，跳转到首页
          this.message.text = '登录成功！正在跳转...'
          this.message.type = 'success'
          //等待两秒
          //使用立即执行的async函数封装延迟逻辑
          await new Promise(resolve => setTimeout(resolve, 2000));
          this.$router.push('/login');
        }else if(response === "email and phoneNumber exist"){
          this.message.text = '邮箱地址与电话号码均已注册，请更换'
          this.message.type = 'error'
        }else if(response === "email exists"){
          this.message.text = '邮箱地址已注册，请更换'
          this.message.type = 'error'
        }else if(response === "phoneNumber exists"){
          this.message.text = '电话号码已注册，请更换'
          this.message.type = 'error'
        }else if(response === "database break"){
          this.message.text = '数据库崩溃'
          this.message.type = 'error'
        }else{
          this.message.text = '代码错误'
          this.message.type = 'error'
        }
        
      }catch (error) {
      //处理网络错误
      this.message.text = '登录失败，请稍后重试'
      this.message.type = 'error'
      console.error("登录请求失败:",error);
      }finally{
        this.loading = false
      }
    }
  }
}
</script>