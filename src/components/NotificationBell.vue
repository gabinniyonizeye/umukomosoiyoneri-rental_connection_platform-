<template>
  <div class="relative">
    <button 
      @click="toggleNotifications"
      class="relative p-2 text-white hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
      aria-label="Notifications"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {{ unreadCount }}
      </span>
    </button>

    <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      <div class="p-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
          <button v-if="notifications.length > 0" @click="markAllAsRead" class="text-sm text-blue-600 hover:text-blue-700">
            Mark all read
          </button>
        </div>
      </div>
      
      <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
        No notifications
      </div>
      
      <div v-else>
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          :class="[
            'p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer',
            !notification.read ? 'bg-blue-50' : ''
          ]"
          @click="markAsRead(notification.id)"
        >
          <div class="flex items-start">
            <div :class="[
              'w-2 h-2 rounded-full mt-2 mr-3',
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            ]"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-800">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ formatTime(notification.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const showNotifications = ref(false)
const notifications = ref([])

const loadNotifications = () => {
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  notifications.value = allNotifications
    .filter(n => n.userId === authStore.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    loadNotifications()
  }
}

const markAsRead = (id) => {
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  const notification = allNotifications.find(n => n.id === id)
  if (notification) {
    notification.read = true
    localStorage.setItem('notifications', JSON.stringify(allNotifications))
    loadNotifications()
  }
}

const markAllAsRead = () => {
  const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  allNotifications.forEach(n => {
    if (n.userId === authStore.user.id) {
      n.read = true
    }
  })
  localStorage.setItem('notifications', JSON.stringify(allNotifications))
  loadNotifications()
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

onMounted(() => {
  loadNotifications()
  // Refresh notifications every 30 seconds
  setInterval(loadNotifications, 30000)
})
</script>
