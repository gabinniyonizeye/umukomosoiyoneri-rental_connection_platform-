# QUICK START GUIDE

## 🚀 Getting Started with Testing

### Step 1: Install Dependencies

```bash
npm install
```

This installs all dependencies including testing tools:
- `vitest` - Test framework
- `@vue/test-utils` - Vue component testing
- `happy-dom` - DOM implementation
- `@vitest/coverage-v8` - Coverage reporting

### Step 2: Run Tests

```bash
# Watch mode (tests re-run on file changes)
npm test

# Run once (for CI/CD)
npm run test:run

# View coverage report
npm run test:coverage

# Interactive UI dashboard
npm run test:ui
```

### Step 3: View Results

**Console Output**:
```
✓ src/stores/auth.spec.js (12 tests)
✓ src/stores/listings.spec.js (18 tests)
✓ src/stores/bookings.spec.js (15 tests)

Test Files  3 passed (3)
     Tests  45 passed (45)
```

**Coverage Report** (after `npm run test:coverage`):
```
File                    | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|----------
All files           |   82.5  |   78.3   |   85.2  |   82.1
 src/stores/auth.js |   90.0  |   85.0   |   92.0  |   90.0
```

---

## 📚 Understanding the Test Files

### Test File Locations

```
src/
├── stores/
│   ├── auth.js
│   ├── auth.spec.js          ← Tests for auth store
│   ├── listings.js
│   ├── listings.spec.js      ← Tests for listings store
│   ├── bookings.js
│   └── bookings.spec.js      ← Tests for bookings store
```

### What Each Test File Tests

#### **auth.spec.js** (12 tests)
Tests user authentication and authorization:
- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Signup as renter
- ✅ Signup as owner with verification
- ✅ Logout
- ✅ Role-based access (renter, owner, admin)
- ✅ User blocking/unblocking

#### **listings.spec.js** (18 tests)
Tests listing management:
- ✅ Add new listing
- ✅ Get all listings
- ✅ Get approved listings only
- ✅ Get pending listings only
- ✅ Update listing
- ✅ Delete listing
- ✅ Approve listing
- ✅ Reject listing with reason
- ✅ Filter by type, location, price

#### **bookings.spec.js** (15 tests)
Tests booking functionality:
- ✅ Create booking
- ✅ Get bookings by renter
- ✅ Get bookings by listing
- ✅ Confirm booking
- ✅ Cancel booking
- ✅ Check availability
- ✅ Prevent overlapping bookings
- ✅ Booking statistics

---

## 🧪 Running Specific Tests

### Run Only Auth Tests

```bash
npm test -- auth.spec.js
```

### Run Only Listings Tests

```bash
npm test -- listings.spec.js
```

### Run Only Bookings Tests

```bash
npm test -- bookings.spec.js
```

### Run Tests Matching a Pattern

```bash
npm test -- --grep "should login"
```

### Run Only One Test

In the test file, change `it()` to `it.only()`:

```javascript
it.only('should login with valid credentials', () => {
  // Only this test runs
})
```

---

## 🐛 Debugging Tests

### View Detailed Output

```bash
npm test -- --reporter=verbose
```

### Print Debug Information

Add `console.log()` in your test:

```javascript
it('should login', () => {
  const store = useAuthStore()
  store.login('renter@test.com', 'renter123')
  
  console.log('Store state:', store.$state)
  console.log('User:', store.user)
  
  expect(store.isAuthenticated).toBe(true)
})
```

Run with:
```bash
npm test -- --reporter=verbose
```

### Skip a Test

```javascript
it.skip('should skip this test', () => {
  // This won't run
})
```

---

## 📊 Understanding Test Output

### Passing Test
```
✓ should login with valid credentials (5ms)
```

### Failing Test
```
✗ should login with valid credentials
  Expected: true
  Received: false
```

### Test Summary
```
Test Files  3 passed (3)
     Tests  45 passed (45)
  Start at  10:30:45
  Duration  2.34s
```

---

## 🔄 Test-Driven Development (TDD) Workflow

### 1. Write Test First

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

### 2. Run Test (It Fails)

```bash
npm test
```

Output: `FAIL - rejectListing is not defined`

### 3. Implement Feature

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

### 4. Run Test (It Passes)

```bash
npm test
```

Output: `PASS - should reject listing with reason`

### 5. Refactor if Needed

Improve code while keeping tests passing.

---

## 📈 Coverage Goals

### Current Coverage Target
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

### View Coverage Report

```bash
npm run test:coverage
```

Opens `coverage/index.html` in browser showing:
- Line-by-line coverage
- Uncovered branches
- Coverage percentage per file

---

## 🔗 Common Assertions

### Equality
```javascript
expect(value).toBe(5)                    // Exact match
expect(value).toEqual({ name: 'John' }) // Deep equality
expect(value).not.toBe(5)                // Not equal
```

### Boolean
```javascript
expect(isAuthenticated).toBe(true)
expect(isAuthenticated).toBeTruthy()
expect(isAuthenticated).toBeFalsy()
```

### Arrays
```javascript
expect(listings).toHaveLength(5)
expect(listings).toContain(listing1)
```

### Objects
```javascript
expect(user).toHaveProperty('email')
expect(user).toMatchObject({ email: 'test@test.com' })
```

### Null/Undefined
```javascript
expect(value).toBeDefined()
expect(value).toBeNull()
expect(value).toBeUndefined()
```

---

## 🚨 Common Issues & Solutions

### Issue: Tests not found
```bash
# Solution: Make sure test files end with .spec.js
# ✅ auth.spec.js
# ❌ auth.test.js (won't run)
```

### Issue: Store not initialized
```javascript
// Solution: Add beforeEach hook
beforeEach(() => {
  setActivePinia(createPinia())
})
```

### Issue: Tests fail randomly
```javascript
// Solution: Ensure tests are isolated
// Each test should be independent
// Don't share state between tests
```

### Issue: Coverage not generated
```bash
# Solution: Install coverage provider
npm install -D @vitest/coverage-v8

# Then run
npm run test:coverage
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `PHASE1_SYSTEM_ANALYSIS.md` | System design & requirements |
| `PHASE1_UML_DIAGRAMS.md` | UML diagrams (9 types) |
| `PHASE3_DOCKER_VCS.md` | Docker & Git setup |
| `PHASE4_TEST_PLAN.md` | Test strategy & cases |
| `TESTING_GUIDE.md` | Detailed testing guide |
| `PROJECT_COMPLETION_SUMMARY.md` | Complete project overview |

---

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Run tests**: `npm test`
3. **Check coverage**: `npm run test:coverage`
4. **Read TESTING_GUIDE.md**: For detailed information
5. **Write new tests**: Following the examples
6. **Build Docker image**: `docker build -t umukomisiyoneri .`
7. **Deploy**: `docker-compose up -d`

---

## 💡 Tips

- Use `npm test` during development (watch mode)
- Use `npm run test:run` in CI/CD pipelines
- Check coverage regularly: `npm run test:coverage`
- Write tests before implementing features (TDD)
- Keep tests focused on one behavior
- Use descriptive test names
- Isolate tests with `beforeEach()`

---

**Quick Start Version**: 1.0  
**Last Updated**: 2025  
**Status**: Ready to Use
