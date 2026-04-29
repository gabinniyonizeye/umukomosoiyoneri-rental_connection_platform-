# TESTING GUIDE - HOW TO USE TESTING IN YOUR APP

## 1. SETUP & INSTALLATION

### 1.1 Install Testing Dependencies

```bash
npm install -D vitest @vue/test-utils happy-dom @vitest/coverage-v8
```

**What each package does**:
- `vitest`: Fast unit test framework
- `@vue/test-utils`: Vue component testing utilities
- `happy-dom`: Lightweight DOM implementation
- `@vitest/coverage-v8`: Code coverage reporting

### 1.2 Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

---

## 2. RUNNING TESTS

### 2.1 Run All Tests

```bash
npm test
```

**Output**:
```
✓ src/stores/auth.spec.js (12 tests)
✓ src/stores/listings.spec.js (18 tests)
✓ src/stores/bookings.spec.js (15 tests)

Test Files  3 passed (3)
     Tests  45 passed (45)
```

### 2.2 Run Tests in Watch Mode

```bash
npm test
```

Tests automatically re-run when files change. Press:
- `q` to quit
- `p` to filter by filename
- `t` to filter by test name

### 2.3 Run Tests Once (CI Mode)

```bash
npm run test:run
```

Useful for CI/CD pipelines.

### 2.4 View Test Coverage

```bash
npm run test:coverage
```

**Output**:
```
File                    | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|----------
All files           |   82.5  |   78.3   |   85.2  |   82.1
 src/stores/auth.js |   90.0  |   85.0   |   92.0  |   90.0
 src/stores/listings.js | 80.0 | 75.0 | 82.0 | 80.0
 src/stores/bookings.js | 78.0 | 74.0 | 80.0 | 78.0
```

### 2.5 Interactive UI

```bash
npm run test:ui
```

Opens browser-based test dashboard at `http://localhost:51204`

---

## 3. UNDERSTANDING TEST STRUCTURE

### 3.1 Basic Test File Structure

```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../stores/auth'
import { setActivePinia, createPinia } from 'pinia'

// Test suite
describe('Auth Store', () => {
  // Setup before each test
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // Test case
  it('should login with valid credentials', () => {
    const store = useAuthStore()
    const result = store.login('renter@test.com', 'renter123')
    
    expect(result).toBe(true)
    expect(store.isAuthenticated).toBe(true)
  })
})
```

### 3.2 Key Concepts

**describe()**: Groups related tests
```javascript
describe('Auth Store', () => {
  // All auth-related tests here
})
```

**it()**: Individual test case
```javascript
it('should login with valid credentials', () => {
  // Test logic
})
```

**expect()**: Assertion (what you expect to happen)
```javascript
expect(result).toBe(true)
expect(store.user.email).toBe('renter@test.com')
```

**beforeEach()**: Runs before each test
```javascript
beforeEach(() => {
  setActivePinia(createPinia()) // Fresh store for each test
})
```

---

## 4. COMMON ASSERTIONS

### 4.1 Equality Checks

```javascript
// Exact match
expect(value).toBe(5)
expect(value).toEqual({ name: 'John' })

// Not equal
expect(value).not.toBe(5)

// Loose equality
expect(value).toEqual(expectedValue)
```

### 4.2 Boolean Checks

```javascript
expect(isAuthenticated).toBe(true)
expect(isAuthenticated).toBeTruthy()
expect(isAuthenticated).toBeFalsy()
```

### 4.3 Array/Object Checks

```javascript
// Array length
expect(listings).toHaveLength(5)

// Array contains
expect(listings).toContain(listing1)

// Object properties
expect(user).toHaveProperty('email')
expect(user).toMatchObject({ email: 'test@test.com' })
```

### 4.4 Type Checks

```javascript
expect(value).toBeDefined()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeInstanceOf(Array)
```

### 4.5 String Checks

```javascript
expect(message).toMatch(/error/i)
expect(message).toContain('error')
expect(message).toHaveLength(10)
```

---

## 5. TESTING YOUR STORES

### 5.1 Testing Auth Store

**What to test**:
- Login with valid/invalid credentials
- Signup with verification
- Logout
- Role-based access
- User blocking

**Example**:
```javascript
describe('Auth Store', () => {
  it('should login with valid credentials', () => {
    const store = useAuthStore()
    const result = store.login('renter@test.com', 'renter123')
    
    expect(result).toBe(true)
    expect(store.isAuthenticated).toBe(true)
    expect(store.user.role).toBe('renter')
  })

  it('should not login with invalid credentials', () => {
    const store = useAuthStore()
    const result = store.login('invalid@test.com', 'wrong')
    
    expect(result).toBe(false)
    expect(store.isAuthenticated).toBe(false)
  })
})
```

### 5.2 Testing Listings Store

**What to test**:
- Add listing
- Get listings (all, approved, pending)
- Update listing
- Delete listing
- Admin approval/rejection
- Search and filter

**Example**:
```javascript
describe('Listings Store', () => {
  it('should add new listing with pending status', () => {
    const store = useListingsStore()
    const result = store.addListing({
      title: 'House',
      description: 'Nice house',
      type: 'House',
      location: 'Kigali',
      price: 50000,
      ownerId: 'owner1'
    })
    
    expect(result).toBe(true)
    expect(store.listings[0].status).toBe('Pending')
  })

  it('should approve listing', () => {
    const store = useListingsStore()
    store.addListing({ /* ... */ })
    
    const listing = store.listings[0]
    store.approveListing(listing.id)
    
    expect(store.listings[0].status).toBe('Approved')
  })
})
```

### 5.3 Testing Bookings Store

**What to test**:
- Create booking
- Get bookings (all, by renter, by listing)
- Confirm/cancel booking
- Check availability
- Prevent overlapping bookings

**Example**:
```javascript
describe('Bookings Store', () => {
  it('should create new booking', () => {
    const store = useBookingsStore()
    const result = store.createBooking({
      listingId: 'listing1',
      renterId: 'renter1',
      startDate: '2025-02-01',
      endDate: '2025-02-05'
    })
    
    expect(result).toBe(true)
    expect(store.bookings[0].status).toBe('Pending')
  })

  it('should not create overlapping bookings', () => {
    const store = useBookingsStore()
    store.createBooking({
      listingId: 'listing1',
      renterId: 'renter1',
      startDate: '2025-02-01',
      endDate: '2025-02-05'
    })
    
    const result = store.createBooking({
      listingId: 'listing1',
      renterId: 'renter2',
      startDate: '2025-02-03',
      endDate: '2025-02-07'
    })
    
    expect(result).toBe(false)
  })
})
```

---

## 6. TESTING COMPONENTS

### 6.1 Test Component Props

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../components/BaseButton.vue'

describe('BaseButton Component', () => {
  it('should render button with text', () => {
    const wrapper = mount(BaseButton, {
      props: {
        text: 'Click me'
      }
    })
    
    expect(wrapper.text()).toContain('Click me')
  })

  it('should emit click event', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        text: 'Click me'
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### 6.2 Test Component Events

```javascript
it('should emit input event on value change', async () => {
  const wrapper = mount(BaseInput, {
    props: {
      modelValue: ''
    }
  })
  
  await wrapper.find('input').setValue('test@test.com')
  
  expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test@test.com'])
})
```

---

## 7. DEBUGGING TESTS

### 7.1 Print Debug Information

```javascript
it('should debug store state', () => {
  const store = useAuthStore()
  store.login('renter@test.com', 'renter123')
  
  console.log('Store state:', store.$state)
  console.log('User:', store.user)
  console.log('Is authenticated:', store.isAuthenticated)
  
  expect(store.isAuthenticated).toBe(true)
})
```

Run with:
```bash
npm test -- --reporter=verbose
```

### 7.2 Skip or Focus Tests

```javascript
// Skip this test
it.skip('should skip this test', () => {
  // This won't run
})

// Only run this test
it.only('should only run this test', () => {
  // Only this runs
})
```

### 7.3 Timeout for Slow Tests

```javascript
it('should handle slow operations', async () => {
  // Test code
}, 10000) // 10 second timeout
```

---

## 8. CONTINUOUS INTEGRATION

### 8.1 GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

Now tests run automatically on every push!

---

## 9. BEST PRACTICES

### 9.1 Test Naming

```javascript
// ✅ Good - describes what it tests
it('should login with valid credentials', () => {})
it('should not create overlapping bookings', () => {})
it('should approve listing and notify owner', () => {})

// ❌ Bad - unclear
it('test login', () => {})
it('works', () => {})
```

### 9.2 Test Organization

```javascript
describe('Auth Store', () => {
  describe('Login', () => {
    it('should login with valid credentials', () => {})
    it('should not login with invalid credentials', () => {})
  })

  describe('Signup', () => {
    it('should signup as renter', () => {})
    it('should signup as owner with verification', () => {})
  })
})
```

### 9.3 Keep Tests Isolated

```javascript
// ✅ Good - each test is independent
beforeEach(() => {
  setActivePinia(createPinia()) // Fresh store
})

// ❌ Bad - tests depend on each other
let store
store = useAuthStore() // Shared state
```

### 9.4 Test One Thing

```javascript
// ✅ Good - tests one behavior
it('should approve listing', () => {
  store.addListing({...})
  store.approveListing(listing.id)
  expect(store.listings[0].status).toBe('Approved')
})

// ❌ Bad - tests multiple things
it('should add and approve listing', () => {
  store.addListing({...})
  store.approveListing(listing.id)
  store.notifyOwner(listing.id)
  expect(store.listings[0].status).toBe('Approved')
  expect(notifications.length).toBe(1)
})
```

---

## 10. QUICK REFERENCE

| Command | Purpose |
|---------|---------|
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:ui` | Open interactive UI |

| Assertion | Usage |
|-----------|-------|
| `expect(x).toBe(y)` | Exact equality |
| `expect(x).toEqual(y)` | Deep equality |
| `expect(x).toBeTruthy()` | Is truthy |
| `expect(x).toHaveLength(n)` | Array/string length |
| `expect(x).toContain(y)` | Contains value |

---

## 11. EXAMPLE WORKFLOW

### Step 1: Write Test First (TDD)

```javascript
it('should reject listing with reason', () => {
  const store = useListingsStore()
  store.addListing({...})
  
  const listing = store.listings[0]
  store.rejectListing(listing.id, 'Invalid location')
  
  expect(store.listings[0].status).toBe('Rejected')
  expect(store.listings[0].rejectionReason).toBe('Invalid location')
})
```

### Step 2: Run Test (It Fails)

```bash
npm test
```

Output: `FAIL - rejectListing is not defined`

### Step 3: Implement Feature

```javascript
// In stores/listings.js
rejectListing(id, reason) {
  const listing = this.listings.find(l => l.id === id)
  if (listing && listing.status === 'Pending') {
    listing.status = 'Rejected'
    listing.rejectionReason = reason
    return true
  }
  return false
}
```

### Step 4: Run Test (It Passes)

```bash
npm test
```

Output: `PASS - should reject listing with reason`

### Step 5: Refactor if Needed

Improve code while keeping tests passing.

---

**Testing Guide Version**: 1.0  
**Last Updated**: 2025  
**Status**: Complete
