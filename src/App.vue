<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useListingsStore } from './stores/listings'
import { useBookingsStore } from './stores/bookings'

const authStore = useAuthStore()
const listingsStore = useListingsStore()
const bookingsStore = useBookingsStore()

onMounted(() => {
  authStore.loadUser()
  listingsStore.loadListings()
  bookingsStore.loadBookings()
})
</script>
