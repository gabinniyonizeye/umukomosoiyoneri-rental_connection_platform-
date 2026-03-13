import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { hashPassword, verifyPassword } from '../utils/crypto'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const { t } = useLanguage()

  function loadUser() {
    const stored = localStorage.getItem('currentUser')
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  function updateUser(userData) {
    user.value = { ...user.value, ...userData }
    localStorage.setItem('currentUser', JSON.stringify(user.value))
    
    // Also update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.value.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  async function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(u => u.email === email)
    
    if (!foundUser) return { success: false, message: t('invalidCredentials') }
    
    // Check if password is plain text (demo accounts) or hashed (new signups)
    let isValidPassword = false
    if (foundUser.password.length === 64) {
      // Hashed password - verify using crypto
      isValidPassword = await verifyPassword(password, foundUser.password)
    } else {
      // Plain text password - direct comparison (demo accounts)
      isValidPassword = foundUser.password === password
    }
    
    if (!isValidPassword) return { success: false, message: t('invalidCredentials') }
    
    if (foundUser.blocked) {
      return { 
        success: false, 
        message: t('accountBlocked')
      }
    }
    
    const { password: pwd, ...userWithoutPassword } = foundUser
    user.value = userWithoutPassword
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
    return { success: true }
  }

  async function signup(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: t('emailAlreadyExists') }
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(userData.password)

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    const { password, ...userWithoutPassword } = newUser
    user.value = userWithoutPassword
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
    
    return { success: true }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('currentUser')
  }

  return { user, isAuthenticated, loadUser, updateUser, login, signup, logout }
})
