import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref([])

  function loadListings() {
    const stored = localStorage.getItem('listings')
    if (stored) {
      listings.value = JSON.parse(stored)
    }
  }

  function saveListings() {
    localStorage.setItem('listings', JSON.stringify(listings.value))
  }

  function addListing(listingData) {
    const newListing = {
      id: Date.now().toString(),
      ...listingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      bookedDates: []
    }
    listings.value.push(newListing)
    saveListings()
    return newListing
  }

  function updateListing(id, updates) {
    const index = listings.value.findIndex(l => l.id === id)
    if (index !== -1) {
      listings.value[index] = { ...listings.value[index], ...updates }
      saveListings()
    }
  }

  function deleteListing(id) {
    listings.value = listings.value.filter(l => l.id !== id)
    saveListings()
  }

  function approveListing(id) {
    updateListing(id, { status: 'approved', rejectionReason: null })
  }

  function rejectListing(id, reason) {
    updateListing(id, { status: 'rejected', rejectionReason: reason })
  }

  const approvedListings = computed(() => 
    listings.value.filter(l => l.status === 'approved')
  )

  const pendingListings = computed(() => 
    listings.value.filter(l => l.status === 'pending')
  )

  function getListingById(id) {
    return listings.value.find(l => l.id === id)
  }

  function getOwnerListings(ownerId) {
    return listings.value.filter(l => l.ownerId === ownerId)
  }

  return {
    listings,
    approvedListings,
    pendingListings,
    loadListings,
    addListing,
    updateListing,
    deleteListing,
    approveListing,
    rejectListing,
    getListingById,
    getOwnerListings
  }
})
