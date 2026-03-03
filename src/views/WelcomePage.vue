<template>
  <div class="h-screen bg-cover bg-center bg-no-repeat overflow-hidden" style="background-image: url('/src/assets/background.webp');">
    <div class="h-full bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-orange-900/80 backdrop-blur-sm">
      <main role="main" class="h-full overflow-y-auto">
        <!-- Language Switcher -->
        <div class="absolute top-2 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <!-- Hero Section -->
        <section class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="text-center mb-3">
            <img src="../assets/umukomisiyoneriWithTitle.png" alt="Umukomisiyoneri Logo" class="h-56 sm:h-64 md:h-72 lg:h-80 w-auto mx-auto mb-2" />
            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {{ t('welcomeTitle') }}
            </h1>
            <p class="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto mb-3 drop-shadow">
              {{ t('welcomeSubtitle') }}
            </p>
            
            <div class="flex flex-wrap gap-2 justify-center mb-2">
              <BaseButton 
                @click="router.push('/signup?role=renter')"
                variant="primary"
                aria-label="Sign up as a renter"
                class="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition text-xs sm:text-sm"
              >
                {{ t('iWantToRent') }}
              </BaseButton>
              <BaseButton 
                @click="router.push('/signup?role=owner')"
                variant="secondary"
                aria-label="Sign up as an owner"
                class="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg transition text-xs sm:text-sm"
              >
                {{ t('iWantToList') }}
              </BaseButton>
            </div>
            
            <p class="text-xs text-white/90">
              {{ t('alreadyHaveAccount') }} 
              <router-link to="/login" class="text-orange-300 hover:text-orange-200 font-semibold underline">
                {{ t('login') }}
              </router-link>
            </p>
          </div>

          <!-- Features Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div class="bg-white/95 backdrop-blur rounded-lg shadow-md p-2 sm:p-3 border-l-4 border-blue-500 hover:shadow-lg transition">
              <div class="flex items-center mb-1">
                <div class="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span class="text-blue-600 font-bold text-xs sm:text-sm">✓</span>
                </div>
                <h2 class="text-sm sm:text-base font-bold text-gray-800">{{ t('forRenters') }}</h2>
              </div>
              <ul class="space-y-0.5 text-xs text-gray-600">
                <li>• {{ t('verifiedListings') }}</li>
                <li>• {{ t('transparentPricing') }}</li>
                <li>• {{ t('easyBooking') }}</li>
                <li>• {{ t('secureTransactions') }}</li>
              </ul>
            </div>

            <div class="bg-white/95 backdrop-blur rounded-lg shadow-md p-2 sm:p-3 border-l-4 border-orange-500 hover:shadow-lg transition">
              <div class="flex items-center mb-1">
                <div class="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                  <span class="text-orange-600 font-bold text-xs sm:text-sm">★</span>
                </div>
                <h2 class="text-sm sm:text-base font-bold text-gray-800">{{ t('forOwners') }}</h2>
              </div>
              <ul class="space-y-0.5 text-xs text-gray-600">
                <li>• {{ t('earnFromAssets') }}</li>
                <li>• {{ t('simpleListing') }}</li>
                <li>• {{ t('adminVerification') }}</li>
                <li>• {{ t('manageListings') }}</li>
              </ul>
            </div>

            <div class="bg-white/95 backdrop-blur rounded-lg shadow-md p-2 sm:p-3 border-l-4 border-blue-500 hover:shadow-lg transition">
              <div class="flex items-center mb-1">
                <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mr-2">
                  <span class="text-blue-600 font-bold text-xs sm:text-sm">→</span>
                </div>
                <h2 class="text-sm sm:text-base font-bold text-gray-800">{{ t('howItWorks') }}</h2>
              </div>
              <ul class="space-y-0.5 text-xs text-gray-600">
                <li><span class="font-semibold text-blue-600">1.</span> {{ t('signUp') }}</li>
                <li><span class="font-semibold text-orange-600">2.</span> {{ t('browseList') }}</li>
                <li><span class="font-semibold text-blue-600">3.</span> {{ t('bookSafely') }}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import BaseButton from '../components/BaseButton.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const router = useRouter()
const { t } = useLanguage()
</script>
