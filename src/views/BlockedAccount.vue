<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="mb-6">
        <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
      
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Account Blocked</h1>
      
      <p class="text-gray-600 mb-6">
        Your account has been temporarily blocked by the administrator. This may be due to a violation of our terms of service or suspicious activity.
      </p>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 class="font-semibold text-gray-900 mb-2">To Resolve This Issue:</h2>
        <ul class="text-sm text-gray-700 text-left space-y-2">
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>Contact our admin team at <a href="mailto:admin@umukomisiyoneri.com" class="text-blue-600 underline">admin@umukomisiyoneri.com</a></span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>Call us at: <a href="tel:+250780960424" class="text-blue-600 underline">+250 780 960 424</a></span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>Provide your account email and explain your situation</span>
          </li>
        </ul>
      </div>
      
      <BaseButton variant="secondary" @click="router.push('/')" class="w-full">
        Back to Home
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
</script>
