<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      
      <div v-if="userBookings.length > 0" class="space-y-4">
        <article
          v-for="booking in userBookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ booking.listingTitle }}</h2>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Check-in:</span> {{ formatDate(booking.startDate) }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Check-out:</span> {{ formatDate(booking.endDate) }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Total:</span> RWF {{ booking.totalPrice.toLocaleString() }}
              </p>
              <p v-if="booking.status === 'rejected' && booking.rejectionReason" class="text-red-600 mb-1 mt-2 p-2 bg-red-50 rounded">
                <span class="font-medium">Rejection Reason:</span> {{ booking.rejectionReason }}
              </p>
              <p class="text-sm text-gray-500 mt-2">
                Booked on {{ formatDate(booking.createdAt) }}
              </p>
            </div>
            <div class="text-right">
              <span 
                :class="statusClasses(booking.status)"
                class="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
              >
                {{ booking.status }}
              </span>
              <BaseButton
                v-if="booking.status === 'confirmed' && canCancel(booking.startDate)"
                variant="danger"
                @click="handleCancel(booking.id)"
              >
                Cancel Booking
              </BaseButton>
            </div>
          </div>
        </article>
      </div>
      
      <div v-else class="text-center py-12 bg-white rounded-lg shadow">
        <p class="text-gray-500 text-lg mb-4">You haven't made any bookings yet.</p>
        <BaseButton variant="primary" @click="router.push('/renter/dashboard')">
          Browse Listings
        </BaseButton>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingsStore } from '../stores/bookings'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const bookingsStore = useBookingsStore()
const authStore = useAuthStore()
const { t } = useLanguage()

onMounted(() => {
  bookingsStore.loadBookings()
})

const userBookings = computed(() => {
  return bookingsStore.getUserBookings(authStore.user.id)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const statusClasses = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const canCancel = (startDate) => {
  const start = new Date(startDate)
  const today = new Date()
  return start > today
}

const handleCancel = (bookingId) => {
  if (confirm(t('cancelBookingConfirm'))) {
    bookingsStore.cancelBooking(bookingId)
  }
}
</script>
