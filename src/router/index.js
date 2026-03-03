import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/WelcomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupPage.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/renter/dashboard',
    name: 'RenterDashboard',
    component: () => import('../views/RenterDashboard.vue'),
    meta: { requiresAuth: true, role: 'renter' }
  },
  {
    path: '/renter/listing/:id',
    name: 'ListingDetail',
    component: () => import('../views/ListingDetail.vue'),
    meta: { requiresAuth: true, role: 'renter' }
  },
  {
    path: '/renter/bookings',
    name: 'MyBookings',
    component: () => import('../views/MyBookings.vue'),
    meta: { requiresAuth: true, role: 'renter' }
  },
  {
    path: '/owner/dashboard',
    name: 'OwnerDashboard',
    component: () => import('../views/OwnerDashboard.vue'),
    meta: { requiresAuth: true, role: 'owner' }
  },
  {
    path: '/owner/add-listing',
    name: 'AddListing',
    component: () => import('../views/AddListing.vue'),
    meta: { requiresAuth: true, role: 'owner' }
  },
  {
    path: '/owner/bookings',
    name: 'OwnerBookings',
    component: () => import('../views/OwnerBookings.vue'),
    meta: { requiresAuth: true, role: 'owner' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: () => import('../views/AdminReports.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/AdminUsers.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Allow navigation to welcome page without checks
  if (to.path === '/') {
    next()
    return
  }
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next(`/${authStore.user.role}/dashboard`)
  } else if (to.meta.role && authStore.user?.role !== to.meta.role) {
    next(`/${authStore.user.role}/dashboard`)
  } else {
    next()
  }
})

export default router
