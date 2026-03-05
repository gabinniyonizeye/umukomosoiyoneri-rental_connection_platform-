<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ t('bookingReports') }}</h1>
      
      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'all'"
            :class="activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            All Bookings
          </button>
          <button
            @click="activeTab = 'confirmed'"
            :class="activeTab === 'confirmed' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Confirmed Bookings
          </button>
        </nav>
      </div>
      
      <!-- Stats -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('totalBookings') }}</p>
          <p class="text-3xl font-bold text-gray-900">{{ allBookings.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('pending') }}</p>
          <p class="text-3xl font-bold text-yellow-600">{{ pendingCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('confirmed') }}</p>
          <p class="text-3xl font-bold text-green-600">{{ confirmedCount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('totalRevenue') }}</p>
          <p class="text-3xl font-bold text-blue-600">${{ totalRevenue }}</p>
        </div>
      </div>
      
      <!-- Bookings List -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('listing') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('renter') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('owner') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('dates') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('amount') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('status') }}</th>
              <th v-if="activeTab === 'confirmed'" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in displayedBookings" :key="booking.id">
              <td class="px-6 py-4 text-sm text-gray-900">{{ booking.listingTitle }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ getUserName(booking.renterId) }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ getOwnerName(booking.listingId) }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ formatDate(booking.startDate) }} - {{ formatDate(booking.endDate) }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">${{ booking.totalPrice }}</td>
              <td class="px-6 py-4">
                <span :class="statusClasses(booking.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ t(booking.status) }}
                </span>
              </td>
              <td v-if="activeTab === 'confirmed'" class="px-6 py-4">
                <BaseButton
                  variant="danger"
                  @click="cancelBooking(booking.id)"
                  class="text-xs py-1 px-3"
                >
                  Cancel Booking
                </BaseButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBookingsStore } from '../stores/bookings'
import { useListingsStore } from '../stores/listings'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import BaseButton from '../components/BaseButton.vue'

const bookingsStore = useBookingsStore()
const listingsStore = useListingsStore()
const { t } = useLanguage()
const activeTab = ref('all')

onMounted(() => {
  bookingsStore.loadBookings()
  listingsStore.loadListings()
})

const allBookings = computed(() => bookingsStore.allBookings)

const displayedBookings = computed(() => {
  if (activeTab.value === 'confirmed') {
    return allBookings.value.filter(b => b.status === 'confirmed')
  }
  return allBookings.value
})

const pendingCount = computed(() => 
  allBookings.value.filter(b => b.status === 'pending').length
)

const confirmedCount = computed(() => 
  allBookings.value.filter(b => b.status === 'confirmed').length
)

const totalRevenue = computed(() => 
  allBookings.value
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0)
)

const cancelBooking = (bookingId) => {
  if (confirm('Cancel this confirmed booking? This will make the property available again.')) {
    bookingsStore.cancelBooking(bookingId)
    bookingsStore.loadBookings()
    listingsStore.loadListings()
  }
}

const getUserName = (userId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.id === userId)
  return user?.name || 'Unknown'
}

const getOwnerName = (listingId) => {
  const listing = listingsStore.getListingById(listingId)
  return listing?.ownerName || 'Unknown'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const statusClasses = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return classes[status]
}
</script>
