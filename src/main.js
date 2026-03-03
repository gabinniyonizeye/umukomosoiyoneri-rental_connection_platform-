import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeDemoData } from './utils/demoData'
import { useAuthStore } from './stores/auth'

// Initialize demo data on first load
initializeDemoData()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Load current user if exists
const authStore = useAuthStore()
authStore.loadUser()

app.mount('#app')
