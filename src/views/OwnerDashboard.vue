<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section with Profile Picture -->
      <div v-if="authStore.user" class="bg-white rounded-lg shadow p-6 mb-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img 
            :src="authStore.user.profilePicture || 'https://via.placeholder.com/80?text=No+Image'"
            alt="Profile Picture"
            class="w-20 h-20 rounded-full object-cover border-4 border-orange-500"
          />
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ t('welcome') }}, {{ authStore.user.name }}!</h1>
            <p class="text-gray-600">{{ t('manageYourListings') }}</p>
          </div>
        </div>
        <BaseButton variant="primary" @click="router.push('/owner/add-listing')">
          + {{ t('addListing') }}
        </BaseButton>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t('myListings') }}</h2>
      
      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              activeTab === tab.value
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            ]"
          >
            {{ t(tab.label.toLowerCase()) }} ({{ getListingsByStatus(tab.value).length }})
          </button>
        </nav>
      </div>
      
      <!-- Listings Grid -->
      <div v-if="displayedListings.length > 0" class="grid md:grid-cols-3 gap-6">
        <div v-for="listing in displayedListings" :key="listing.id" class="relative">
          <ListingCard
            :listing="listing"
            :show-status="true"
            @click="viewListing(listing)"
          />
          <div class="mt-2 flex gap-2">
            <BaseButton
              variant="secondary"
              @click.stop="editListing(listing.id)"
              class="flex-1 text-sm py-2"
            >
              {{ t('edit') }}
            </BaseButton>
            <BaseButton
              variant="danger"
              @click.stop="deleteListing(listing.id)"
              class="flex-1 text-sm py-2"
            >
              {{ t('delete') }}
            </BaseButton>
          </div>
          <div v-if="listing.rejectionReason" class="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800">
              <span class="font-medium">Rejection reason:</span> {{ listing.rejectionReason }}
            </p>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12 bg-white rounded-lg shadow">
        <p class="text-gray-500 text-lg mb-4">
          {{ activeTab === 'all' ? t('noListingsYet') : `No ${activeTab} listings.` }}
        </p>
        <BaseButton variant="primary" @click="router.push('/owner/add-listing')">
          {{ t('addFirstListing') }}
        </BaseButton>
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
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()
const { t } = useLanguage()

const activeTab = ref('all')

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

onMounted(() => {
  // Ensure user is loaded
  if (!authStore.user) {
    authStore.loadUser()
  }
  
  try {
    listingsStore.loadListings()
  } catch (error) {
    console.error('Error loading listings:', error)
  }
})

const ownerListings = computed(() => {
  if (!authStore.user || !authStore.user.id) return []
  return listingsStore.getOwnerListings(authStore.user.id)
})

const getListingsByStatus = (status) => {
  if (status === 'all') return ownerListings.value
  return ownerListings.value.filter(l => l.status === status)
}

const displayedListings = computed(() => {
  return getListingsByStatus(activeTab.value)
})

const viewListing = (listing) => {
  // For now, just show an alert with details
  alert(`Listing: ${listing.title}\nStatus: ${listing.status}\nPrice: $${listing.price}`)
}

const editListing = (id) => {
  alert('Edit functionality would redirect to edit form. For this prototype, please delete and create a new listing.')
}

const deleteListing = (id) => {
  if (confirm(t('deleteListingConfirm'))) {
    listingsStore.deleteListing(id)
  }
}
</script>
