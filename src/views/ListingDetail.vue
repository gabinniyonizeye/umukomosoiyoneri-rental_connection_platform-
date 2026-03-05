<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
    <NavBar />
    
    <!-- Rental Agreement Modal -->
    <div v-if="showAgreementModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="showAgreementModal = false">
      <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Rental Agreement</h2>
          <button @click="showAgreementModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="prose prose-sm max-w-none">
          <pre class="whitespace-pre-wrap text-sm text-gray-700 font-sans">{{ agreementText }}</pre>
        </div>
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <label class="flex items-start cursor-pointer">
            <input
              type="checkbox"
              v-model="bookingData.agreeToTerms"
              class="mt-1 mr-3 focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700 font-medium">
              I have read, understood, and agree to all terms in this Rental Agreement. I accept full responsibility for the property during my rental period.
            </span>
          </label>
        </div>
        <div class="mt-4 flex justify-end gap-3">
          <BaseButton variant="secondary" @click="showAgreementModal = false">Cancel</BaseButton>
          <BaseButton variant="primary" @click="confirmAgreement" :disabled="!bookingData.agreeToTerms">I Agree & Continue</BaseButton>
        </div>
      </div>
    </div>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        @click="router.back()"
        class="mb-6 text-blue-600 hover:text-blue-700 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
      >
        ← {{ t('backToListings') }}
      </button>
      
      <div v-if="listing" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Image Gallery -->
        <div class="h-96 bg-gray-200">
          <img 
            v-if="listing.photos && listing.photos.length > 0"
            :src="listing.photos[0]" 
            :alt="`Photo of ${listing.title}`"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-8">
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="md:col-span-2">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ listing.title }}</h1>
              <p class="text-lg text-gray-600 mb-4">{{ listing.location }}</p>
              
              <div class="mb-6">
                <span class="text-3xl font-bold text-blue-600">
                  ${{ listing.price }}
                </span>
                <span class="text-gray-500">/ {{ listing.rentalPeriod || 'day' }}</span>
                <span 
                  :class="availabilityClasses"
                  class="ml-4 px-3 py-1 text-sm font-medium rounded"
                >
                  {{ availabilityStatus }}
                </span>
              </div>
              
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ t('description') }}</h2>
                <p class="text-gray-700">{{ listing.description }}</p>
              </div>
              
              <div v-if="listing.amenities && listing.amenities.length > 0" class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ t('amenities') }}</h2>
                <ul class="grid grid-cols-2 gap-2">
                  <li v-for="amenity in listing.amenities" :key="amenity" class="flex items-center text-gray-700">
                    <span class="text-green-600 mr-2">✓</span>
                    {{ amenity }}
                  </li>
                </ul>
              </div>
              
              <div v-if="listing.features && listing.features.length > 0" class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ t('features') }}</h2>
                <ul class="grid grid-cols-2 gap-2">
                  <li v-for="feature in listing.features" :key="feature" class="flex items-center text-gray-700">
                    <span class="text-green-600 mr-2">✓</span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
              
              <div v-if="listing.rules" class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ t('rules') }}</h2>
                <p class="text-gray-700 whitespace-pre-line">{{ listing.rules }}</p>
              </div>
              
              <!-- Owner Contact Info -->
              <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ t('ownerContact') }}</h2>
                <div class="space-y-2">
                  <p class="text-gray-700">
                    <span class="font-medium">Name:</span> {{ listing.ownerName }}
                  </p>
                  <p class="text-gray-700">
                    <span class="font-medium">Phone:</span> 
                    <a :href="`tel:${getOwnerPhone(listing.ownerId)}`" class="text-blue-600 hover:underline">
                      {{ getOwnerPhone(listing.ownerId) }}
                    </a>
                  </p>
                  <p class="text-gray-700">
                    <span class="font-medium">Email:</span> 
                    <a :href="`mailto:${getOwnerEmail(listing.ownerId)}`" class="text-blue-600 hover:underline">
                      {{ getOwnerEmail(listing.ownerId) }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Booking Card -->
            <div class="md:col-span-1">
              <div class="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ t('bookThis') }} {{ listing.type }}</h2>
                
                <form @submit.prevent="handleBooking">
                  <div class="mb-4">
                    <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('startDate') }} <span class="text-red-600">*</span>
                    </label>
                    <input
                      id="startDate"
                      v-model="bookingData.startDate"
                      type="date"
                      required
                      :min="minDate"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div class="mb-4">
                    <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('endDate') }} <span class="text-red-600">*</span>
                    </label>
                    <input
                      id="endDate"
                      v-model="bookingData.endDate"
                      type="date"
                      required
                      :min="bookingData.startDate || minDate"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div class="mb-4">
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('gender') }} <span class="text-red-600">*</span>
                    </label>
                    <select
                      id="gender"
                      v-model="bookingData.gender"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div class="mb-4">
                    <label for="maritalStatus" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('maritalStatus') }} <span class="text-red-600">*</span>
                    </label>
                    <select
                      id="maritalStatus"
                      v-model="bookingData.maritalStatus"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  
                  <div v-if="bookingData.maritalStatus === 'married'" class="mb-4">
                    <label for="numberOfChildren" class="block text-sm font-medium text-gray-700 mb-2">
                      {{ t('numberOfChildren') }} <span class="text-red-600">*</span>
                    </label>
                    <input
                      id="numberOfChildren"
                      v-model.number="bookingData.numberOfChildren"
                      type="number"
                      min="0"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div class="mb-4 p-4 bg-white rounded-lg">
                    <div class="flex justify-between text-gray-700 mb-2">
                      <span>{{ numberOfDays }} {{ getPeriodLabel() }}</span>
                      <span>${{ listing.price }} × {{ numberOfDays }}</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t">
                      <span>{{ t('total') }}</span>
                      <span>${{ totalPrice }}</span>
                    </div>
                  </div>
                  
                  <div v-if="bookingError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                    <p class="text-sm text-red-600">{{ bookingError }}</p>
                  </div>
                  
                  <div v-if="bookingSuccess" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg" role="alert">
                    <p class="text-sm text-green-600">Booking request sent! Waiting for owner approval. Redirecting...</p>
                  </div>
                  
                  <BaseButton 
                    type="submit" 
                    variant="primary" 
                    class="w-full"
                    :disabled="!bookingData.startDate || !bookingData.endDate || isCurrentlyBooked"
                  >
                    {{ isCurrentlyBooked ? 'Currently Booked' : t('sendBookingRequest') }}
                  </BaseButton>
                  
                  <p v-if="isCurrentlyBooked" class="mt-2 text-sm text-red-600 text-center">
                    This property is currently booked. Please check back later.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">{{ t('listingNotFound') }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useListingsStore } from '../stores/listings'
import { useBookingsStore } from '../stores/bookings'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import { updateAgreements } from '../utils/agreements'
import NavBar from '../components/NavBar.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const listingsStore = useListingsStore()
const bookingsStore = useBookingsStore()
const authStore = useAuthStore()
const { currentLanguage, t } = useLanguage()

const listing = ref(null)
const showAgreementModal = ref(false)
const agreementText = computed(() => updateAgreements().rental)
const bookingData = ref({
  startDate: '',
  endDate: '',
  gender: '',
  maritalStatus: '',
  numberOfChildren: 0,
  agreeToTerms: false
})
const bookingError = ref('')
const bookingSuccess = ref(false)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const numberOfDays = computed(() => {
  if (!bookingData.value.startDate || !bookingData.value.endDate) return 0
  const start = new Date(bookingData.value.startDate)
  const end = new Date(bookingData.value.endDate)
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
})

const getPeriodLabel = () => {
  const period = listing.value?.rentalPeriod || 'day'
  const count = numberOfDays.value
  if (period === 'day') return count === 1 ? 'day' : 'days'
  if (period === 'month') return count === 1 ? 'month' : 'months'
  if (period === 'year') return count === 1 ? 'year' : 'years'
  return 'days'
}

const totalPrice = computed(() => {
  return numberOfDays.value * (listing.value?.price || 0)
})

const isCurrentlyBooked = computed(() => {
  if (!listing.value?.bookedDates || listing.value.bookedDates.length === 0) return false
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return listing.value.bookedDates.some(booking => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    return today >= start && today <= end
  })
})

const availabilityStatus = computed(() => {
  return isCurrentlyBooked.value ? 'Booked' : 'Available'
})

const availabilityClasses = computed(() => {
  return isCurrentlyBooked.value 
    ? 'bg-red-100 text-red-800' 
    : 'bg-green-100 text-green-800'
})

onMounted(() => {
  listingsStore.loadListings()
  listing.value = listingsStore.getListingById(route.params.id)
})

const handleBooking = () => {
  bookingError.value = ''
  bookingSuccess.value = false

  if (new Date(bookingData.value.endDate) <= new Date(bookingData.value.startDate)) {
    bookingError.value = 'End date must be after start date'
    return
  }

  if (!bookingData.value.gender) {
    bookingError.value = 'Please select your gender'
    return
  }

  if (!bookingData.value.maritalStatus) {
    bookingError.value = 'Please select your marital status'
    return
  }

  if (bookingData.value.maritalStatus === 'married' && bookingData.value.numberOfChildren === '') {
    bookingError.value = 'Please enter number of children'
    return
  }

  // Show agreement modal
  showAgreementModal.value = true
}

const confirmAgreement = () => {
  if (!bookingData.value.agreeToTerms) {
    bookingError.value = 'You must agree to the rental terms'
    return
  }

  showAgreementModal.value = false

  const result = bookingsStore.createBooking({
    listingId: listing.value.id,
    renterId: authStore.user.id,
    startDate: bookingData.value.startDate,
    endDate: bookingData.value.endDate,
    gender: bookingData.value.gender,
    maritalStatus: bookingData.value.maritalStatus,
    numberOfChildren: bookingData.value.maritalStatus === 'married' ? bookingData.value.numberOfChildren : 0,
    totalPrice: totalPrice.value,
    listingTitle: listing.value.title
  })

  if (result.success) {
    bookingSuccess.value = true
    bookingData.value = { startDate: '', endDate: '', gender: '', maritalStatus: '', numberOfChildren: 0, agreeToTerms: false }
    setTimeout(() => {
      router.push('/renter/bookings')
    }, 2000)
  } else {
    bookingError.value = result.message
  }
}

const getOwnerPhone = (ownerId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const owner = users.find(u => u.id === ownerId)
  return owner?.phone || 'N/A'
}

const getOwnerEmail = (ownerId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const owner = users.find(u => u.id === ownerId)
  return owner?.email || 'N/A'
}
</script>
