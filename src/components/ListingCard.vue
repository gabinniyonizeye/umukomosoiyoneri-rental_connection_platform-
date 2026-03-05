<template>
  <article 
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    @click="$emit('click')"
    @keypress.enter="$emit('click')"
    tabindex="0"
    role="button"
    :aria-label="`View details for ${listing.title}`"
  >
    <div class="h-48 bg-gray-200 overflow-hidden">
      <img 
        v-if="listing.photos && listing.photos.length > 0"
        :src="listing.photos[0]" 
        :alt="`Photo of ${listing.title}`"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
        <span>No image</span>
      </div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900">{{ listing.title }}</h3>
        <span 
          v-if="showStatus"
          :class="statusClasses"
          class="px-2 py-1 text-xs font-medium rounded"
        >
          {{ listing.status }}
        </span>
      </div>
      <p class="text-sm text-gray-600 mb-2">{{ listing.location }}</p>
      <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ listing.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold text-blue-600">
          ${{ listing.price }}<span class="text-sm text-gray-500">/{{ listing.rentalPeriod || 'day' }}</span>
        </span>
        <div class="flex items-center gap-2">
          <span 
            :class="availabilityClasses"
            class="px-2 py-1 text-xs font-medium rounded"
          >
            {{ availabilityStatus }}
          </span>
          <span class="text-xs text-gray-500 capitalize">{{ listing.type }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  listing: {
    type: Object,
    required: true
  },
  showStatus: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const statusClasses = computed(() => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[props.listing.status] || ''
})

const isCurrentlyBooked = computed(() => {
  if (!props.listing.bookedDates || props.listing.bookedDates.length === 0) return false
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return props.listing.bookedDates.some(booking => {
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
</script>
