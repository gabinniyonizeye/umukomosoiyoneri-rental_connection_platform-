<template>
  <div class="relative">
    <button
      @click="showMenu = !showMenu"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      aria-label="Change language"
    >
      <span class="text-xl">🌐</span>
      <span class="text-sm font-medium">{{ languageNames[currentLanguage] }}</span>
    </button>
    
    <div
      v-if="showMenu"
      class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 transition flex items-center gap-2"
        :class="{ 'bg-blue-50 text-blue-600 font-medium': currentLanguage === lang.code }"
      >
        <span>{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage, setLanguage } = useLanguage()
const showMenu = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

const languageNames = {
  en: 'EN',
  rw: 'RW',
  fr: 'FR'
}

const changeLanguage = (lang) => {
  setLanguage(lang)
  showMenu.value = false
}
</script>
