<template>
  <div class="min-h-screen bg-cover bg-center bg-no-repeat" style="background-image: url('/src/assets/background.webp');">
    <div class="min-h-screen bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-orange-900/80 backdrop-blur-sm flex items-center justify-center px-4 py-4">
      <div class="max-w-md w-full bg-white/95 backdrop-blur rounded-lg shadow-xl p-4 sm:p-6 border-t-4 border-blue-500">
      <div class="flex justify-center mb-2">
        <img src="../assets/umukomisiyoneriLogo.png" alt="Umukomisiyoneri Logo" class="h-12 sm:h-16 w-auto" />
      </div>
      <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-3 sm:mb-4 text-center">{{ t('login') }}</h1>
      
      <form @submit.prevent="handleLogin" novalidate>
        <BaseInput
          id="email"
          v-model="formData.email"
          :label="t('email')"
          type="email"
          required
          placeholder="your@email.com"
          :error="errors.email"
        />
        
        <BaseInput
          id="password"
          v-model="formData.password"
          :label="t('password')"
          type="password"
          required
          placeholder="Enter your password"
          :error="errors.password"
        />
        
        <div v-if="errors.general" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p class="text-sm text-red-600">{{ errors.general }}</p>
        </div>
        
        <BaseButton 
          type="submit" 
          variant="primary" 
          class="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white"
          :disabled="isLoading"
        >
          {{ isLoading ? t('loggingIn') : t('login') }}
        </BaseButton>
      </form>
      
      <p class="mt-3 sm:mt-4 text-center text-gray-600 text-xs sm:text-sm">
        {{ t('dontHaveAccount') }} 
        <router-link to="/signup" class="text-orange-600 hover:text-orange-700 font-medium underline">
          {{ t('signup') }}
        </router-link>
      </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useLanguage()

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''
  errors.general = ''

  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  setTimeout(async () => {
    const result = await authStore.login(formData.email, formData.password)
    
    if (result.success) {
      router.push(`/${authStore.user.role}/dashboard`)
    } else {
      errors.general = result.message
    }
    
    isLoading.value = false
  }, 500)
}
</script>
