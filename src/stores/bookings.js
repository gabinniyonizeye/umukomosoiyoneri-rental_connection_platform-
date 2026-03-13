import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useListingsStore } from './listings'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([])

  function loadBookings() {
    const stored = localStorage.getItem('bookings')
    if (stored) {
      bookings.value = JSON.parse(stored)
    }
  }

  function saveBookings() {
    localStorage.setItem('bookings', JSON.stringify(bookings.value))
  }

  function createBooking(bookingData) {
    const listingsStore = useListingsStore()
    const listing = listingsStore.getListingById(bookingData.listingId)
    
    if (!listing) return { success: false, message: 'Listing not found' }

    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    bookings.value.push(newBooking)
    saveBookings()

    // Notify owner about new booking request
    const ownerNotification = {
      id: Date.now().toString() + '_owner',
      userId: listing.ownerId,
      message: `New booking request for "${listing.title}" from ${bookingData.startDate} to ${bookingData.endDate}`,
      type: 'info',
      read: false,
      createdAt: new Date().toISOString()
    }
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    notifications.push(ownerNotification)
    localStorage.setItem('notifications', JSON.stringify(notifications))
    
    // Trigger storage event for immediate notification update
    window.dispatchEvent(new StorageEvent('storage', { key: 'notifications' }))

    return { success: true, booking: newBooking }
  }

  function approveBooking(id) {
    const booking = bookings.value.find(b => b.id === id)
    if (booking) {
      booking.status = 'confirmed'
      booking.statusUpdatedAt = new Date().toISOString()
      saveBookings()
      
      const listingsStore = useListingsStore()
      const listing = listingsStore.getListingById(booking.listingId)
      const bookedDates = listing.bookedDates || []
      bookedDates.push({ startDate: booking.startDate, endDate: booking.endDate })
      listingsStore.updateListing(booking.listingId, { bookedDates })
      
      createNotification(booking.renterId, `Your booking for "${booking.listingTitle}" has been approved!`, 'success')
    }
  }

  function rejectBooking(id, reason) {
    const booking = bookings.value.find(b => b.id === id)
    if (booking) {
      booking.status = 'rejected'
      booking.rejectionReason = reason
      booking.statusUpdatedAt = new Date().toISOString()
      saveBookings()
      
      createNotification(booking.renterId, `Your booking for "${booking.listingTitle}" was rejected. Reason: ${reason}`, 'error')
    }
  }

  function cancelBooking(id) {
    const booking = bookings.value.find(b => b.id === id)
    if (booking) {
      booking.status = 'cancelled'
      booking.statusUpdatedAt = new Date().toISOString()
      saveBookings()
      
      // Remove booked dates from listing to make it available again
      const listingsStore = useListingsStore()
      const listing = listingsStore.getListingById(booking.listingId)
      if (listing && listing.bookedDates) {
        const updatedBookedDates = listing.bookedDates.filter(date => 
          !(date.startDate === booking.startDate && date.endDate === booking.endDate)
        )
        listingsStore.updateListing(booking.listingId, { bookedDates: updatedBookedDates })
      }
    }
  }

  function createNotification(userId, message, type) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    notifications.push({
      id: Date.now().toString(),
      userId,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }

  function getUserBookings(userId) {
    return bookings.value.filter(b => b.renterId === userId)
  }

  function getOwnerBookings(ownerId) {
    const listingsStore = useListingsStore()
    const ownerListingIds = listingsStore.getOwnerListings(ownerId).map(l => l.id)
    return bookings.value.filter(b => ownerListingIds.includes(b.listingId))
  }

  const allBookings = computed(() => bookings.value)

  return {
    bookings,
    allBookings,
    loadBookings,
    createBooking,
    approveBooking,
    rejectBooking,
    cancelBooking,
    getUserBookings,
    getOwnerBookings
  }
})
