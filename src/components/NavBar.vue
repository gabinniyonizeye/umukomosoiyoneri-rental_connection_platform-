<template>
  <header class="bg-gradient-to-r from-blue-600 to-orange-600 shadow-lg">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <img src="../assets/umukomisiyoneriLogo.png" alt="Umukomisiyoneri Logo" class="h-10 w-auto" />
          <h1 class="text-2xl font-bold text-white">UMUKOMISIYONERI</h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <template v-if="authStore.isAuthenticated">
            <router-link
              :to="`/${authStore.user.role}/dashboard`"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('dashboard') }}
            </router-link>
            
            <router-link
              v-if="authStore.user.role === 'renter'"
              to="/renter/bookings"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('myBookings') }}
            </router-link>
            
            <router-link
              v-if="authStore.user.role === 'owner'"
              to="/owner/add-listing"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('addListing') }}
            </router-link>
            
            <router-link
              v-if="authStore.user.role === 'owner'"
              to="/owner/bookings"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('bookingRequests') }}
            </router-link>
            
            <router-link
              v-if="authStore.user.role === 'admin'"
              to="/admin/reports"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('reports') }}
            </router-link>
            
            <router-link
              v-if="authStore.user.role === 'admin'"
              to="/admin/users"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('users') }}
            </router-link>
            
            <router-link
              to="/profile"
              class="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            >
              {{ t('profile') }}
            </router-link>
            
            <NotificationBell />
            
            <span class="text-sm text-orange-100">{{ authStore.user.name }}</span>
            
            <BaseButton 
              variant="secondary" 
              @click="handleLogout"
              aria-label="Log out"
              class="bg-white text-blue-600 hover:bg-blue-50"
            >
              {{ t('logout') }}
            </BaseButton>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import BaseButton from './BaseButton.vue'
import NotificationBell from './NotificationBell.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useLanguage()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
