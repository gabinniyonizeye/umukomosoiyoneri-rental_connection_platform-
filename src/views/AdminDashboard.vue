<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section with Profile Picture -->
      <div class="bg-white rounded-lg shadow p-6 mb-8 flex items-center gap-4">
        <img 
          :src="authStore.user.profilePicture || 'https://via.placeholder.com/80?text=Admin'"
          alt="Profile Picture"
          class="w-20 h-20 rounded-full object-cover border-4 border-green-500"
        />
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ t('adminDashboard') }}</h1>
          <p class="text-gray-600">{{ t('welcome') }}, {{ authStore.user.name }}</p>
        </div>
      </div>
      
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
            {{ t(tab.label === 'Pending Reviews' ? 'pendingReviews' : tab.label.toLowerCase()) }} ({{ getListingsByStatus(tab.value).length }})
          </button>
        </nav>
      </div>
      
      <!-- Pending Listings -->
      <div v-if="activeTab === 'pending' && displayedListings.length > 0" class="space-y-6">
        <article
          v-for="listing in displayedListings"
          :key="listing.id"
          class="bg-white rounded-lg shadow-lg p-6"
        >
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Listing Preview -->
            <div class="md:col-span-2">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ listing.title }}</h2>
                  <p class="text-gray-600">{{ listing.location }}</p>
                </div>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded">
                  {{ t('pendingReview') }}
                </span>
              </div>
              
              <div class="mb-4">
                <img 
                  v-if="listing.photos && listing.photos.length > 0"
                  :src="listing.photos[0]" 
                  :alt="`Photo of ${listing.title}`"
                  class="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              <div class="mb-4">
                <p class="text-gray-700">{{ listing.description }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span class="text-sm text-gray-600">Type:</span>
                  <span class="ml-2 font-medium capitalize">{{ listing.type }}</span>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Price:</span>
                  <span class="ml-2 font-medium">${{ listing.price }}/{{ listing.type === 'house' ? 'night' : 'day' }}</span>
                </div>
                <div>
                  <span class="text-sm text-gray-600">{{ t('owner') }}:</span>
                  <span class="ml-2 font-medium">{{ listing.ownerName }}</span>
                </div>
                <div>
                  <span class="text-sm text-gray-600">{{ t('submitted') }}:</span>
                  <span class="ml-2 font-medium">{{ formatDate(listing.createdAt) }}</span>
                </div>
              </div>
              
              <div v-if="listing.amenities && listing.amenities.length > 0" class="mb-4">
                <h3 class="font-semibold text-gray-900 mb-2">{{ t('amenities') }}:</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="amenity in listing.amenities"
                    :key="amenity"
                    class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {{ amenity }}
                  </span>
                </div>
              </div>
              
              <div v-if="listing.features && listing.features.length > 0" class="mb-4">
                <h3 class="font-semibold text-gray-900 mb-2">{{ t('features') }}:</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="feature in listing.features"
                    :key="feature"
                    class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Verification Info & Actions -->
            <div class="md:col-span-1">
              <div class="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 class="font-semibold text-gray-900 mb-3">{{ t('verificationInfo') }}</h3>
                <div class="space-y-2 text-sm">
                  <div>
                    <span class="text-gray-600">{{ t('idNumber') }}:</span>
                    <p class="font-mono text-gray-900">{{ listing.idNumber }}</p>
                  </div>
                  <div>
                    <span class="text-gray-600">{{ t('upiId') }}:</span>
                    <p class="font-mono text-gray-900">{{ listing.upiId }}</p>
                  </div>
                </div>
              </div>
              
              <div class="space-y-3">
                <BaseButton
                  variant="success"
                  @click="approveListing(listing.id)"
                  class="w-full"
                >
                  ✓ {{ t('approveListing') }}
                </BaseButton>
                
                <BaseButton
                  variant="danger"
                  @click="openRejectModal(listing)"
                  class="w-full"
                >
                  ✗ {{ t('rejectListing') }}
                </BaseButton>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <!-- Approved/Rejected Listings -->
      <div v-else-if="displayedListings.length > 0" class="grid md:grid-cols-3 gap-6">
        <ListingCard
          v-for="listing in displayedListings"
          :key="listing.id"
          :listing="listing"
          :show-status="true"
        />
      </div>
      
      <div v-else class="text-center py-12 bg-white rounded-lg shadow">
        <p class="text-gray-500 text-lg">{{ activeTab === 'pending' ? t('noPendingListings') : activeTab === 'approved' ? t('noApprovedListings') : t('noRejectedListings') }}</p>
      </div>
    </main>
    
    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeRejectModal"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full" role="dialog" aria-labelledby="reject-title">
        <h2 id="reject-title" class="text-xl font-bold text-gray-900 mb-4">{{ t('rejectListing') }}</h2>
        <p class="text-gray-600 mb-4">{{ t('rejectReasonPrompt') }}</p>
        
        <textarea
          v-model="rejectionReason"
          rows="4"
          placeholder="e.g., ID not clear, Price seems unrealistic..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
          aria-label="Rejection reason"
        ></textarea>
        
        <div class="flex gap-3">
          <BaseButton
            variant="danger"
            @click="confirmReject"
            class="flex-1"
            :disabled="!rejectionReason.trim()"
          >
            {{ t('confirmReject') }}
          </BaseButton>
          <BaseButton
            variant="secondary"
            @click="closeRejectModal"
            class="flex-1"
          >
            {{ t('cancel') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useListingsStore } from '../stores/listings'
import { useAuthStore } from '../stores/auth'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import ListingCard from '../components/ListingCard.vue'
import BaseButton from '../components/BaseButton.vue'

const listingsStore = useListingsStore()
const authStore = useAuthStore()
const { t } = useLanguage()

const activeTab = ref('pending')
const showRejectModal = ref(false)
const selectedListing = ref(null)
const rejectionReason = ref('')

const tabs = [
  { label: 'Pending Reviews', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

onMounted(() => {
  if (!authStore.user) {
    authStore.loadUser()
  }
  listingsStore.loadListings()
})

const getListingsByStatus = (status) => {
  return listingsStore.listings.filter(l => l.status === status)
}

const displayedListings = computed(() => {
  return getListingsByStatus(activeTab.value)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const approveListing = (id) => {
  if (confirm(t('approveListingConfirm'))) {
    listingsStore.approveListing(id)
  }
}

const openRejectModal = (listing) => {
  selectedListing.value = listing
  rejectionReason.value = ''
  showRejectModal.value = true
}

const closeRejectModal = () => {
  showRejectModal.value = false
  selectedListing.value = null
  rejectionReason.value = ''
}

const confirmReject = () => {
  if (selectedListing.value && rejectionReason.value.trim()) {
    listingsStore.rejectListing(selectedListing.value.id, rejectionReason.value)
    closeRejectModal()
  }
}
</script>
