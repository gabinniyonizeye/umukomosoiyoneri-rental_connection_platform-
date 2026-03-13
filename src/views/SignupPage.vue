<template>
  <div class="min-h-screen bg-cover bg-center bg-no-repeat" style="background-image: url('/src/assets/background.webp');">
    <div class="min-h-screen bg-gradient-to-br from-blue-50/90 to-orange-50/90 backdrop-blur-sm py-8 px-4">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 border-t-4 border-orange-500">
      <div class="flex justify-center mb-3">
        <img src="../assets/umukomisiyoneriLogo.png" alt="Umukomisiyoneri Logo" class="h-20 w-auto" />
      </div>
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-6 text-center">{{ t('signup') }}</h1>
      
      <!-- Terms Modal -->
      <div v-if="showTermsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="showTermsModal = false">
        <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('termsAndConditions') }}</h2>
            <button @click="showTermsModal = false" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="prose prose-sm max-w-none">
            <pre class="whitespace-pre-wrap text-sm text-gray-700 font-sans">{{ termsText }}</pre>
          </div>
          <div class="mt-6 flex justify-end">
            <BaseButton variant="primary" @click="acceptTerms">{{ t('iAccept') }}</BaseButton>
          </div>
        </div>
      </div>
      
      <form @submit.prevent="handleSignup" novalidate>
        <!-- Role Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('iWantTo') }} <span class="text-red-600" aria-label="required">*</span>
          </label>
          <div class="flex gap-4">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="formData.role"
                value="renter"
                class="mr-2 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span>{{ t('rent') }}</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="formData.role"
                value="owner"
                class="mr-2 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span>{{ t('listAssets') }}</span>
            </label>
          </div>
        </div>

        <!-- Basic Info -->
        <BaseInput
          id="name"
          v-model="formData.name"
          :label="t('name')"
          required
          placeholder="John Doe"
          :error="errors.name"
        />
        
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
          id="phone"
          v-model="formData.phone"
          :label="t('phone')"
          type="tel"
          required
          placeholder="+250 XXX XXX XXX"
          :error="errors.phone"
        />
        
        <BaseInput
          id="password"
          v-model="formData.password"
          :label="t('password')"
          type="password"
          required
          :placeholder="t('minimumChars')"
          :error="errors.password"
        />

        <!-- Verification Fields for Both Roles -->
        <div class="mt-6 p-4 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg border border-blue-200">
          <h2 class="text-lg font-semibold text-blue-700 mb-4">{{ t('verificationInfo') }}</h2>
          <p class="text-sm text-gray-600 mb-4">
            {{ t('verificationDesc') }}
          </p>
          
          <BaseInput
            id="idNumber"
            v-model="formData.idNumber"
            :label="t('nationalId')"
            required
            placeholder="1XXXXXXXXXXXXXXXXX"
            :error="errors.idNumber"
          />
          
          <BaseInput
            v-if="formData.role === 'owner'"
            id="upiId"
            v-model="formData.upiId"
            :label="t('upiId')"
            required
            placeholder="yourname@bank or account number"
            :error="errors.upiId"
          />
        </div>
        
        <div v-if="errors.general" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p class="text-sm text-red-600">{{ errors.general }}</p>
        </div>
        
        <!-- Terms Agreement -->
        <div class="mt-6 p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border border-orange-200">
          <label class="flex items-start cursor-pointer">
            <input
              type="checkbox"
              v-model="formData.agreeToTerms"
              class="mt-1 mr-3 focus:ring-2 focus:ring-orange-500"
              required
            />
            <span class="text-sm text-gray-700">
              {{ t('iAgreeToThe') }} 
              <button type="button" @click.prevent="showTermsModal = true" class="text-orange-600 underline font-medium hover:text-orange-700">
                {{ t('termsAndConditions') }}
              </button>
            </span>
          </label>
          <p v-if="errors.agreeToTerms" class="mt-2 text-sm text-red-600">{{ errors.agreeToTerms }}</p>
        </div>
        
        <BaseButton 
          type="submit" 
          variant="primary" 
          class="w-full mt-6 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white"
          :disabled="isLoading"
        >
          {{ isLoading ? t('creatingAccount') : t('signup') }}
        </BaseButton>
      </form>
      
      <p class="mt-6 text-center text-gray-600">
        {{ t('alreadyHaveAccount') }} 
        <router-link to="/login" class="text-orange-600 hover:text-orange-700 font-medium underline">
          {{ t('login') }}
        </router-link>
      </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import { updateAgreements } from '../utils/agreements'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { currentLanguage, t } = useLanguage()

const showTermsModal = ref(false)
const termsText = computed(() => updateAgreements().terms)

const formData = reactive({
  role: 'renter',
  name: '',
  email: '',
  phone: '',
  password: '',
  idNumber: '',
  upiId: '',
  agreeToTerms: false
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  idNumber: '',
  upiId: '',
  agreeToTerms: '',
  general: ''
})

const isLoading = ref(false)

onMounted(() => {
  if (route.query.role) {
    formData.role = route.query.role
  }
})

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!formData.name) {
    errors.name = 'Name is required'
    isValid = false
  }

  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  // ID required for all users
  if (!formData.idNumber) {
    errors.idNumber = 'ID or Passport number is required'
    isValid = false
  }

  // UPI only required for owners
  if (formData.role === 'owner') {
    if (!formData.upiId) {
      errors.upiId = 'UPI ID is required for owners'
      isValid = false
    }
  }

  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must accept the Terms and Conditions'
    isValid = false
  }

  return isValid
}

const acceptTerms = () => {
  formData.agreeToTerms = true
  showTermsModal.value = false
}

const handleSignup = async () => {
  if (!validateForm()) return

  isLoading.value = true

  setTimeout(async () => {
    const result = await authStore.signup(formData)
    
    if (result.success) {
      router.push(`/${formData.role}/dashboard`)
    } else {
      errors.general = result.message
    }
    
    isLoading.value = false
  }, 500)
}
</script>
