<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section with Profile Picture -->
      <div class="bg-white rounded-lg shadow p-6 mb-8 flex items-center gap-4">
        <img 
          :src="authStore.user.profilePicture || 'https://via.placeholder.com/80?text=No+Image'"
          alt="Profile Picture"
          class="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ t('welcome') }}, {{ authStore.user.name }}!</h1>
          <p class="text-gray-600">{{ t('browseAvailableListings') }}</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t('browseListings') }}</h2>
      
      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid md:grid-cols-4 gap-4">
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">{{ t('search') }}</label>
            <input
              id="search"
              v-model="filters.search"
              type="text"
              placeholder="Location or title..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 mb-2">{{ t('type') }}</label>
            <select
              id="type"
              v-model="filters.type"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ t('all') }}</option>
              <option value="house">{{ t('houses') }}</option>
              <option value="car">{{ t('cars') }}</option>
            </select>
          </div>
          
          <div>
            <label for="minPrice" class="block text-sm font-medium text-gray-700 mb-2">{{ t('minPrice') }}</label>
            <input
              id="minPrice"
              v-model.number="filters.minPrice"
              type="number"
              placeholder="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label for="maxPrice" class="block text-sm font-medium text-gray-700 mb-2">{{ t('maxPrice') }}</label>
            <input
              id="maxPrice"
              v-model.number="filters.maxPrice"
              type="number"
              placeholder="1000"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <!-- Listings Grid -->
      <div v-if="filteredListings.length > 0" class="grid md:grid-cols-3 gap-6">
        <ListingCard
          v-for="listing in filteredListings"
          :key="listing.id"
          :listing="listing"
          @click="router.push(`/renter/listing/${listing.id}`)"
        />
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">{{ t('noListingsFound') }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '../stores/listings'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import ListingCard from '../components/ListingCard.vue'

const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()
const { t } = useLanguage()

const filters = ref({
  search: '',
  type: '',
  minPrice: null,
  maxPrice: null
})

onMounted(() => {
  if (!authStore.user) {
    authStore.loadUser()
  }
  listingsStore.loadListings()
})

const filteredListings = computed(() => {
  let results = listingsStore.approvedListings

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    results = results.filter(l => 
      l.title.toLowerCase().includes(search) || 
      l.location.toLowerCase().includes(search)
    )
  }

  if (filters.value.type) {
    results = results.filter(l => l.type === filters.value.type)
  }

  if (filters.value.minPrice !== null && filters.value.minPrice !== '') {
    results = results.filter(l => l.price >= filters.value.minPrice)
  }

  if (filters.value.maxPrice !== null && filters.value.maxPrice !== '') {
    results = results.filter(l => l.price <= filters.value.maxPrice)
  }

  return results
})
</script>
