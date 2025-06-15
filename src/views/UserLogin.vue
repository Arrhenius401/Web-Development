<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 头部 -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">社区交易</h1>
        </router-link>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">欢迎回来</h2>
        <p class="text-gray-600">登录您的账户继续使用</p>
      </div>

      <!-- 登录表单 -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 邮箱/手机号 -->
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
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
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
          </div>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                记住我
              </label>
            </div>
            <router-link
              to="/forgotPassword"
              class="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              忘记密码？
            </router-link>
          </div>

          <!-- 验证码 -->
          <div v-if="showCaptcha">
            <label for="captcha" class="block text-sm font-medium text-gray-700 mb-2">
              验证码
            </label>
            <div class="flex space-x-3">
              <input
                id="captcha"
                v-model="form.captcha"
                type="text"
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

          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? '登录中...' : '登录' }}
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

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              @click="loginWithWechat"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18z"/>
                <path d="M23.995 14.6c0-3.844-3.642-6.966-8.119-6.966-4.478 0-8.119 3.122-8.119 6.966 0 3.844 3.641 6.966 8.119 6.966a9.93 9.93 0 0 0 2.716-.378.515.515 0 0 1 .429.058l1.444.823a.195.195 0 0 0 .098.027.176.176 0 0 0 .174-.176.148.148 0 0 0-.027-.126l-.295-1.11a.35.35 0 0 1 .127-.396c1.738-1.275 2.453-3.112 2.453-5.688z"/>
              </svg>
              <span class="ml-2">微信</span>
            </button>

            <button
              @click="loginWithQQ"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              <span class="ml-2">QQ</span>
            </button>
          </div>
        </div>

        <!-- 注册链接 -->
        <div class="mt-6 text-center">
          <span class="text-gray-600">还没有账户？</span>
          <router-link
            to="/register"
            class="ml-1 text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            立即注册
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
import { loginByEmail, loginByPhoneNumber } from '../services/api';
import router from '../router';

export default {
  name: 'UserLogin',
  data() {
    return {
      form: {
        account: '',
        password: '',
        captcha: '',
        remember: false
      },
      message: {
        text: '',
        type: ''  //'success' or 'error'
      },
      errors: {},
      loading: false,
      showPassword: false,
      showCaptcha: false,
      captchaCode: '',
      loginAttempts: 0
    }
  },
  computed: {
    isFormValid() {
      return this.form.account && 
             this.form.password && 
             (!this.showCaptcha || this.form.captcha) &&
             Object.keys(this.errors).length === 0
    }
  },
  mounted() {
    this.refreshCaptcha()
    // 检查是否需要显示验证码
    this.checkCaptchaRequired()
  },
  methods: {
    
    //判断account状态
    emailOrPhoneNumber(account) {
      let status = ''
      // 邮箱验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // 手机号验证
      const phoneRegex = /^1[3-9]\d{9}$/
      
      if (emailRegex.test(account) ) {
        status = 'email'
      }else if(phoneRegex.test(account)){
        status = 'phoneNunber'
      }else{
        status = 'invalid'
      }
      return status
    },

    validateAccount() {
      const account = this.form.account.trim()
      if (!account) {
        this.errors.account = '请输入邮箱或手机号'
        return false
      }
      
      if (this.emailOrPhoneNumber(account) == 'invalid') {
        this.errors.account = '请输入正确的邮箱或手机号'
        return false
      }
      
      delete this.errors.account
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
      
      delete this.errors.password
      return true
    },
    
    validateCaptcha() {
      if (!this.showCaptcha) return true
      
      const captcha = this.form.captcha.toLowerCase()
      if (!captcha) {
        this.errors.captcha = '请输入验证码'
        return false
      }
      
      if (captcha !== this.captchaCode.toLowerCase()) {
        this.errors.captcha = '验证码错误'
        return false
      }
      
      delete this.errors.captcha
      return true
    },
    
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }
    },
    
    refreshCaptcha() {
      // 生成随机验证码
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let result = ''
      for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.captchaCode = result
    },
    
    checkCaptchaRequired() {
      // 检查登录失败次数，超过3次显示验证码
      const attempts = localStorage.getItem('loginAttempts') || 0
      this.loginAttempts = parseInt(attempts)
      this.showCaptcha = this.loginAttempts >= 3
    },
    
    async handleLogin() {
      // 验证表单
      const isAccountValid = this.validateAccount()
      const isPasswordValid = this.validatePassword()
      const isCaptchaValid = this.validateCaptcha()
      
      if (!isAccountValid || !isPasswordValid || !isCaptchaValid) {
        //打印日志
        console.log("%cisAccountValid: %s; isPasswordValid: %s; isCaptchaValid: %s;", "color: red; font-size: 16px", isAccountValid, 
                    isPasswordValid,isCaptchaValid)
        return
      }
      
      this.loading = true
      
      try {
        const account = this.form.account.trim()
        const password = this.form.password
        let status = this.emailOrPhoneNumber(account)
        let response
        
        // 清除之前的消息
        this.message.text = ''

        status = this.emailOrPhoneNumber(account)
        //调用登录API
        if(status == 'email'){
          //输出日志
          console.log("发出登录请求: 邮箱 = ",account,";密码 = ",password)
          response = await loginByEmail(account, password);
        }else if(status == 'phoneNunber'){
          //输出日志
          console.log("发出登录请求: 电话号码 = ",account,";密码 = ",password)
          response = await loginByPhoneNumber(account,password)
        }else{
          //输出日志
          console.log("发出非法登录请求，代码错误")
          return
        }
          

        //处理登录结果
        if(response.status === "ok"){
          //登录成功，跳转到首页
          this.message.text = '登录成功！正在跳转...'
          this.message.type = 'success'
          //存储token
          localStorage.setItem("local-token",JSON.stringify(response))
          router.push('/');
        }else if(response.status === "wrong password"){
          this.message.text = '密码错误，请重试'
          this.message.type = 'error'
        }else if(response.status === "wrong credential"){
          this.message.text = '不存在该用户，请注册'
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
    },

    
    async loginWithWechat() {
      this.$parent.showToast({
        type: 'info',
        title: '功能开发中',
        message: '微信登录功能正在开发中'
      })
    },
    
    async loginWithQQ() {
      this.$parent.showToast({
        type: 'info',
        title: '功能开发中',
        message: 'QQ登录功能正在开发中'
      })
    }
  }
}
</script>