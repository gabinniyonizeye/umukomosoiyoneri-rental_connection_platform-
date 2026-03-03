<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
    <NavBar />
    
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ t('myProfile') }}</h1>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <form @submit.prevent="handleUpdate">
          <!-- Profile Picture -->
          <div class="mb-6 flex flex-col items-center">
            <div class="relative mb-4">
              <img 
                :src="profilePicture || 'https://via.placeholder.com/150?text=No+Image'"
                alt="Profile Picture"
                class="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <button
                v-if="profilePicture"
                @click="removeProfilePicture"
                type="button"
                class="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                aria-label="Remove profile picture"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <label class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              <input 
                type="file" 
                @change="handleImageUpload" 
                accept="image/*"
                class="hidden"
              />
              {{ t('uploadProfilePicture') }}
            </label>
            <p v-if="errors.profilePicture" class="text-sm text-red-600 mt-2">{{ errors.profilePicture }}</p>
          </div>

          <!-- Basic Info -->
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ t('basicInformation') }}</h2>
            
            <BaseInput
              id="name"
              v-model="formData.name"
              :label="t('fullName')"
              required
              :error="errors.name"
            />
            
            <BaseInput
              id="email"
              v-model="formData.email"
              :label="t('email')"
              type="email"
              required
              :error="errors.email"
            />
            
            <BaseInput
              id="phone"
              v-model="formData.phone"
              :label="t('phoneNumber')"
              type="tel"
              required
              :error="errors.phone"
            />
          </div>

          <!-- Verification Info -->
          <div class="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ t('verificationInfo') }}</h2>
            
            <BaseInput
              id="idNumber"
              v-model="formData.idNumber"
              :label="t('nationalId')"
              required
              :error="errors.idNumber"
            />
            
            <BaseInput
              v-if="authStore.user.role === 'owner'"
              id="upiId"
              v-model="formData.upiId"
              :label="t('upiId')"
              required
              :error="errors.upiId"
            />
          </div>

          <!-- Change Password -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ t('changePassword') }}</h2>
            <p class="text-sm text-gray-600 mb-4">{{ t('leaveBlankPassword') }}</p>
            
            <BaseInput
              id="currentPassword"
              v-model="formData.currentPassword"
              :label="t('currentPassword')"
              type="password"
              :placeholder="t('currentPassword')"
              :error="errors.currentPassword"
            />
            
            <BaseInput
              id="newPassword"
              v-model="formData.newPassword"
              :label="t('newPassword')"
              type="password"
              :placeholder="t('minimumChars')"
              :error="errors.newPassword"
            />
            
            <BaseInput
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :label="t('confirmNewPassword')"
              type="password"
              :placeholder="t('confirmNewPassword')"
              :error="errors.confirmPassword"
            />
          </div>

          <div v-if="errors.general" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
            <p class="text-sm text-red-600">{{ errors.general }}</p>
          </div>

          <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg" role="alert">
            <p class="text-sm text-green-600">{{ successMessage }}</p>
          </div>

          <div class="flex gap-4">
            <BaseButton type="submit" variant="primary" :disabled="isLoading">
              {{ isLoading ? t('updating') : t('updateProfile') }}
            </BaseButton>
            <BaseButton type="button" variant="secondary" @click="router.back()">
              {{ t('cancel') }}
            </BaseButton>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useLanguage()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  idNumber: '',
  upiId: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const profilePicture = ref('')

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  idNumber: '',
  upiId: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  profilePicture: '',
  general: ''
})

const isLoading = ref(false)
const successMessage = ref('')

onMounted(() => {
  const user = authStore.user
  formData.name = user.name
  formData.email = user.email
  formData.phone = user.phone || ''
  formData.idNumber = user.idNumber || ''
  formData.upiId = user.upiId || ''
  profilePicture.value = user.profilePicture || ''
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5000000) {
      errors.profilePicture = 'Image size must be less than 5MB'
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      // Compress image
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxSize = 300
        let width = img.width
        let height = img.height
        
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        profilePicture.value = canvas.toDataURL('image/jpeg', 0.7)
        errors.profilePicture = ''
        saveProfilePicture()
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProfilePicture = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const userIndex = users.findIndex(u => u.id === authStore.user.id)
  
  if (userIndex !== -1) {
    users[userIndex].profilePicture = profilePicture.value
    localStorage.setItem('users', JSON.stringify(users))
    
    // Update current user session without triggering updateUser
    authStore.user.profilePicture = profilePicture.value
    localStorage.setItem('currentUser', JSON.stringify(authStore.user))
    
    successMessage.value = t('profileUpdated')
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}

const removeProfilePicture = () => {
  if (confirm(t('removeProfilePictureConfirm'))) {
    profilePicture.value = ''
    saveProfilePicture()
  }
}

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
    errors.phone = 'Phone is required'
    isValid = false
  }

  if (!formData.idNumber) {
    errors.idNumber = 'ID number is required'
    isValid = false
  }

  if (authStore.user.role === 'owner' && !formData.upiId) {
    errors.upiId = 'UPI ID is required'
    isValid = false
  }

  // Password validation if changing
  if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
    if (!formData.currentPassword) {
      errors.currentPassword = 'Current password required to change password'
      isValid = false
    }
    if (!formData.newPassword) {
      errors.newPassword = 'New password is required'
      isValid = false
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters'
      isValid = false
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
      isValid = false
    }
  }

  return isValid
}

const handleUpdate = () => {
  if (!validateForm()) return

  isLoading.value = true
  successMessage.value = ''

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === authStore.user.id)

    if (userIndex === -1) {
      errors.general = 'User not found'
      isLoading.value = false
      return
    }

    const user = users[userIndex]

    // Verify current password if changing
    if (formData.currentPassword) {
      if (user.password !== formData.currentPassword) {
        errors.currentPassword = 'Current password is incorrect'
        isLoading.value = false
        return
      }
      user.password = formData.newPassword
    }

    // Update user data
    user.name = formData.name
    user.email = formData.email
    user.phone = formData.phone
    user.idNumber = formData.idNumber
    user.profilePicture = profilePicture.value
    if (authStore.user.role === 'owner') {
      user.upiId = formData.upiId
    }

    users[userIndex] = user
    localStorage.setItem('users', JSON.stringify(users))

    // Update current user session without triggering updateUser
    const { password, ...userWithoutPassword } = user
    authStore.user = userWithoutPassword
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

    successMessage.value = 'Profile updated successfully!'
    
    // Clear password fields
    formData.currentPassword = ''
    formData.newPassword = ''
    formData.confirmPassword = ''

    isLoading.value = false
  }, 500)
}
</script>
