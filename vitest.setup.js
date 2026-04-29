import { vi } from 'vitest'

// Create a real storage object
const store = {}

// Mock localStorage with actual persistence
const localStorageMock = {
  getItem: (key) => {
    return store[key] || null
  },
  setItem: (key, value) => {
    store[key] = value.toString()
  },
  removeItem: (key) => {
    delete store[key]
  },
  clear: () => {
    Object.keys(store).forEach(key => delete store[key])
  }
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})
