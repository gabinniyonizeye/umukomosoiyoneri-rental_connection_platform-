<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Booking Requests</h1>
      
      <div v-if="ownerBookings.length > 0" class="space-y-4">
        <article
          v-for="booking in ownerBookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ booking.listingTitle }}</h2>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Renter:</span> {{ getRenterName(booking.renterId) }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Phone:</span> 
                <a :href="`tel:${getRenterPhone(booking.renterId)}`" class="text-blue-600 hover:underline">
                  {{ getRenterPhone(booking.renterId) }}
                </a>
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Email:</span> 
                <a :href="`mailto:${getRenterEmail(booking.renterId)}`" class="text-blue-600 hover:underline">
                  {{ getRenterEmail(booking.renterId) }}
                </a>
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Gender:</span> {{ booking.gender || 'N/A' }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Marital Status:</span> {{ booking.maritalStatus || 'N/A' }}
              </p>
              <p v-if="booking.maritalStatus === 'married'" class="text-gray-600 mb-1">
                <span class="font-medium">Number of Children:</span> {{ booking.numberOfChildren || 0 }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Check-in:</span> {{ formatDate(booking.startDate) }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Check-out:</span> {{ formatDate(booking.endDate) }}
              </p>
              <p class="text-gray-600 mb-1">
                <span class="font-medium">Total:</span> RWF {{ booking.totalPrice.toLocaleString() }}
              </p>
              <p class="text-sm text-gray-500 mt-2">
                Requested on {{ formatDate(booking.createdAt) }}
              </p>
            </div>
            <div class="text-right ml-4">
              <span 
                :class="statusClasses(booking.status)"
                class="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
              >
                {{ booking.status }}
              </span>
              <div v-if="booking.status === 'pending'" class="flex flex-col gap-2">
                <BaseButton
                  variant="success"
                  @click="handleApprove(booking.id)"
                  class="text-sm"
                >
                  Approve
                </BaseButton>
                <BaseButton
                  variant="danger"
                  @click="handleReject(booking.id)"
                  class="text-sm"
                >
                  Reject
                </BaseButton>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <div v-else class="text-center py-12 bg-white rounded-lg shadow">
        <p class="text-gray-500 text-lg">No booking requests yet.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBookingsStore } from '../stores/bookings'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import BaseButton from '../components/BaseButton.vue'

const bookingsStore = useBookingsStore()
const authStore = useAuthStore()
const { t } = useLanguage()

onMounted(() => {
  bookingsStore.loadBookings()
})

const ownerBookings = computed(() => {
  return bookingsStore.getOwnerBookings(authStore.user.id)
})

const getRenterName = (renterId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const renter = users.find(u => u.id === renterId)
  return renter?.name || 'Unknown'
}

const getRenterPhone = (renterId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const renter = users.find(u => u.id === renterId)
  return renter?.phone || 'N/A'
}

const getRenterEmail = (renterId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const renter = users.find(u => u.id === renterId)
  return renter?.email || 'N/A'
}

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

const handleApprove = (bookingId) => {
  if (confirm(t('approveBookingConfirm'))) {
    bookingsStore.approveBooking(bookingId)
  }
}

const handleReject = (bookingId) => {
  const reason = prompt(t('rejectReasonPrompt'))
  if (reason && reason.trim()) {
    bookingsStore.rejectBooking(bookingId, reason.trim())
  } else if (reason !== null) {
    alert(t('rejectReasonRequired'))
  }
}
</script>
