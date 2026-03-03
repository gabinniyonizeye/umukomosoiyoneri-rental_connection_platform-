<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-green-100">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ t('userManagement') }}</h1>
      
      <!-- Stats -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('totalUsers') }}</p>
          <p class="text-3xl font-bold text-gray-900">{{ allUsers.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('activeUsers') }}</p>
          <p class="text-3xl font-bold text-green-600">{{ activeUsers }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">{{ t('blockedUsers') }}</p>
          <p class="text-3xl font-bold text-red-600">{{ blockedUsers }}</p>
        </div>
      </div>
      
      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('name') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('email') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('role') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('phone') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('status') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in allUsers" :key="user.id">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ user.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full capitalize"
                  :class="roleClasses(user.role)">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ user.phone || 'N/A' }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                  {{ user.blocked ? t('blocked') : t('active') }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div v-if="user.role !== 'admin'" class="flex gap-2">
                  <BaseButton
                    v-if="!user.blocked"
                    variant="danger"
                    @click="blockUser(user.id)"
                    class="text-xs py-1 px-3"
                  >
                    {{ t('block') }}
                  </BaseButton>
                  <BaseButton
                    v-else
                    variant="success"
                    @click="unblockUser(user.id)"
                    class="text-xs py-1 px-3"
                  >
                    {{ t('unblock') }}
                  </BaseButton>
                </div>
                <span v-else class="text-xs text-gray-400">{{ t('admin') }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import NavBar from '../components/NavBar.vue'
import BaseButton from '../components/BaseButton.vue'

const { t } = useLanguage()
const allUsers = ref([])

onMounted(() => {
  loadUsers()
})

const loadUsers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  allUsers.value = users
}

const activeUsers = computed(() => 
  allUsers.value.filter(u => !u.blocked).length
)

const blockedUsers = computed(() => 
  allUsers.value.filter(u => u.blocked).length
)

const roleClasses = (role) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800',
    owner: 'bg-blue-100 text-blue-800',
    renter: 'bg-green-100 text-green-800'
  }
  return classes[role]
}

const blockUser = (userId) => {
  if (confirm(t('blockUserConfirm'))) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.id === userId)
    if (user) {
      user.blocked = true
      user.blockedAt = new Date().toISOString()
      localStorage.setItem('users', JSON.stringify(users))
      loadUsers()
    }
  }
}

const unblockUser = (userId) => {
  if (confirm(t('unblockUserConfirm'))) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.id === userId)
    if (user) {
      user.blocked = false
      user.blockedAt = null
      localStorage.setItem('users', JSON.stringify(users))
      loadUsers()
    }
  }
}
</script>
