<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
    <NavBar />
    
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ t('addNewListing') }}</h1>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <form @submit.prevent="handleSubmit" novalidate>
          <!-- Type Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('propertyType') }} <span class="text-red-600">*</span>
            </label>
            <div class="flex gap-4">
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="formData.type"
                  value="house"
                  class="mr-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span>{{ t('house') }}</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="formData.type"
                  value="car"
                  class="mr-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span>{{ t('car') }}</span>
              </label>
            </div>
          </div>

          <!-- Basic Info -->
          <BaseInput
            id="title"
            v-model="formData.title"
            :label="t('title')"
            required
            :placeholder="t('titlePlaceholder')"
            :error="errors.title"
          />
          
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('description') }} <span class="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              required
              rows="4"
              :placeholder="t('descriptionPlaceholder')"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          </div>
          
          <BaseInput
            id="location"
            v-model="formData.location"
            :label="t('location')"
            required
            :placeholder="t('locationPlaceholder')"
            :error="errors.location"
          />
          
          <BaseInput
            id="price"
            v-model.number="formData.price"
            :label="t('pricePerNight')"
            type="number"
            required
            placeholder="50"
            :error="errors.price"
          />
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('rentalPeriod') }} <span class="text-red-600">*</span>
            </label>
            <select
              v-model="formData.rentalPeriod"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="day">{{ t('perDayOption') }}</option>
              <option value="month">{{ t('perMonthOption') }}</option>
              <option value="year">{{ t('perYearOption') }}</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">{{ t('selectRentalPeriod') }}</p>
          </div>
          
          <BaseInput
            id="photos"
            v-model="formData.photos"
            :label="t('photoUrl')"
            :placeholder="t('photoUrlPlaceholder')"
            :error="errors.photos"
          />
          
          <div class="mb-4">
            <label for="photoUpload" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('orUploadPhotos') }}
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              multiple
              @change="handlePhotoUpload"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-500 mt-1">{{ t('uploadPhotos') }}</p>
          </div>

          <!-- Amenities for Houses -->
          <div v-if="formData.type === 'house'" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('amenities') }}</label>
            <div class="grid grid-cols-2 gap-3">
              <label v-for="amenity in houseAmenities" :key="amenity" class="flex items-center">
                <input
                  type="checkbox"
                  :value="amenity"
                  v-model="formData.amenities"
                  class="mr-2 focus:ring-2 focus:ring-blue-500"
                />
                <span class="text-sm">{{ amenity }}</span>
              </label>
            </div>
          </div>

          <!-- Features for Cars -->
          <div v-if="formData.type === 'car'" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('features') }}</label>
            <div class="grid grid-cols-2 gap-3">
              <label v-for="feature in carFeatures" :key="feature" class="flex items-center">
                <input
                  type="checkbox"
                  :value="feature"
                  v-model="formData.features"
                  class="mr-2 focus:ring-2 focus:ring-blue-500"
                />
                <span class="text-sm">{{ feature }}</span>
              </label>
            </div>
          </div>

          <!-- Rules -->
          <div class="mb-6">
            <label for="rules" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('rules') }}
            </label>
            <textarea
              id="rules"
              v-model="formData.rules"
              rows="3"
              :placeholder="t('rulesPlaceholder')"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            ></textarea>
          </div>

          <!-- Verification Info -->
          <div class="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ t('verificationInfo') }}</h2>
            <p class="text-sm text-gray-600 mb-4">
              {{ t('verificationInfoDesc') }}
            </p>
            
            <BaseInput
              id="idNumber"
              v-model="formData.idNumber"
              :label="t('idNumber')"
              required
              :placeholder="authStore.user.idNumber || t('idNumberPlaceholder')"
              :error="errors.idNumber"
            />
            
            <BaseInput
              id="upiId"
              v-model="formData.upiId"
              :label="t('upiId')"
              required
              :placeholder="authStore.user.upiId || t('upiIdPlaceholder')"
              :error="errors.upiId"
            />
          </div>

          <div v-if="errors.general" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
            <p class="text-sm text-red-600">{{ errors.general }}</p>
          </div>

          <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg" role="alert">
            <p class="text-sm text-green-600">{{ successMessage }}</p>
          </div>

          <!-- Terms Agreement -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label class="flex items-start cursor-pointer">
              <input
                type="checkbox"
                v-model="formData.agreeToTerms"
                class="mt-1 mr-3 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span class="text-sm text-gray-700">
                {{ t('agreeToTermsText') }}
              </span>
            </label>
            <p v-if="errors.agreeToTerms" class="mt-2 text-sm text-red-600">{{ errors.agreeToTerms }}</p>
          </div>

          <div class="flex gap-4">
            <BaseButton 
              type="submit" 
              variant="primary" 
              class="flex-1"
              :disabled="isLoading"
            >
              {{ isLoading ? t('submitting') : t('submitForReview') }}
            </BaseButton>
            <BaseButton 
              type="button" 
              variant="secondary" 
              @click="router.back()"
            >
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
import { useListingsStore } from '../stores/listings'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()
const { t } = useLanguage()

const formData = reactive({
  type: 'house',
  title: '',
  description: '',
  location: '',
  price: null,
  rentalPeriod: 'day',
  photos: '',
  uploadedPhotos: [],
  amenities: [],
  features: [],
  rules: '',
  idNumber: '',
  upiId: '',
  agreeToTerms: false
})

const errors = reactive({
  title: '',
  description: '',
  location: '',
  price: '',
  photos: '',
  idNumber: '',
  upiId: '',
  agreeToTerms: '',
  general: ''
})

const isLoading = ref(false)
const successMessage = ref('')

const houseAmenities = ['Wi-Fi', 'Kitchen', 'Parking', 'Air Conditioning', 'Heating', 'TV', 'Washer', 'Pool']
const carFeatures = ['Air Conditioning', 'Automatic', 'Manual', 'Bluetooth', 'GPS', 'USB Port', '4WD', 'Sunroof']

onMounted(() => {
  // Pre-fill verification info from user profile
  if (authStore.user.idNumber) {
    formData.idNumber = authStore.user.idNumber
  }
  if (authStore.user.upiId) {
    formData.upiId = authStore.user.upiId
  }
})

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!formData.title) {
    errors.title = 'Title is required'
    isValid = false
  }

  if (!formData.description) {
    errors.description = 'Description is required'
    isValid = false
  }

  if (!formData.location) {
    errors.location = 'Location is required'
    isValid = false
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = 'Valid price is required'
    isValid = false
  }

  if (!formData.idNumber) {
    errors.idNumber = 'ID number is required'
    isValid = false
  }

  if (!formData.upiId) {
    errors.upiId = 'UPI ID is required'
    isValid = false
  }

  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions'
    isValid = false
  }

  return isValid
}

const handlePhotoUpload = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 5) {
    errors.photos = 'Maximum 5 photos allowed'
    return
  }
  
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.uploadedPhotos.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const handleSubmit = () => {
  if (!validateForm()) return

  isLoading.value = true
  successMessage.value = ''

  setTimeout(() => {
    const photoArray = formData.photos ? [formData.photos] : []
    const allPhotos = [...photoArray, ...formData.uploadedPhotos]
    
    const listingData = {
      ...formData,
      photos: allPhotos,
      ownerId: authStore.user.id,
      ownerName: authStore.user.name
    }

    listingsStore.addListing(listingData)
    
    successMessage.value = 'Your listing has been submitted for review!'
    isLoading.value = false

    setTimeout(() => {
      router.push('/owner/dashboard')
    }, 2000)
  }, 500)
}
</script>
