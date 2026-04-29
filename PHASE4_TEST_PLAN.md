# PHASE 4: SOFTWARE TEST PLAN

## 1. TEST PLAN OVERVIEW

### 1.1 Purpose
This document outlines the testing strategy for Umukomisiyoneri rental marketplace platform to ensure quality, reliability, and user satisfaction.

### 1.2 Scope
- Unit testing (individual components and functions)
- Integration testing (component interactions)
- End-to-end testing (complete user workflows)
- Accessibility testing (WCAG AA compliance)
- Performance testing (load and response times)
- Security testing (input validation, XSS prevention)

### 1.3 Testing Objectives
✅ Verify all functional requirements are met  
✅ Identify and document defects  
✅ Ensure code quality and maintainability  
✅ Validate accessibility compliance  
✅ Confirm security measures  
✅ Optimize performance  

---

## 2. TESTING STRATEGY

### 2.1 Testing Levels

| Level | Scope | Tools | Coverage |
|-------|-------|-------|----------|
| Unit | Individual functions/components | Vitest, Vue Test Utils | 80%+ |
| Integration | Component interactions | Vitest, Vue Test Utils | 70%+ |
| E2E | Complete user workflows | Playwright/Cypress | 60%+ |
| Accessibility | WCAG AA compliance | axe DevTools, WAVE | 100% |
| Performance | Load times, responsiveness | Lighthouse, DevTools | Baseline |
| Security | Input validation, XSS | Manual review, OWASP | Critical paths |

### 2.2 Testing Approach

```
┌─────────────────────────────────────────┐
│      DEVELOPMENT PHASE                  │
├─────────────────────────────────────────┤
│  1. Write unit tests (TDD approach)     │
│  2. Implement feature                   │
│  3. Run tests locally                   │
│  4. Fix failing tests                   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      CODE REVIEW PHASE                  │
├─────────────────────────────────────────┤
│  1. Peer review code                    │
│  2. Run integration tests               │
│  3. Check code coverage                 │
│  4. Verify accessibility                │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      TESTING PHASE                      │
├─────────────────────────────────────────┤
│  1. Run full test suite                 │
│  2. E2E testing                         │
│  3. Performance testing                 │
│  4. Security testing                    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      DEPLOYMENT PHASE                   │
├─────────────────────────────────────────┤
│  1. Staging environment testing         │
│  2. User acceptance testing             │
│  3. Production deployment               │
│  4. Monitoring and logging              │
└─────────────────────────────────────────┘
```

---

## 3. TEST CASES

### 3.1 Authentication Tests

#### TC-AUTH-001: User Login
```
Precondition: User has valid credentials
Steps:
  1. Navigate to login page
  2. Enter email: renter@test.com
  3. Enter password: renter123
  4. Click "Login"
Expected Result: User logged in, redirected to dashboard
```

#### TC-AUTH-002: Invalid Credentials
```
Precondition: User has invalid credentials
Steps:
  1. Navigate to login page
  2. Enter email: invalid@test.com
  3. Enter password: wrongpassword
  4. Click "Login"
Expected Result: Error message displayed, user not logged in
```

#### TC-AUTH-003: Owner Registration with Verification
```
Precondition: New owner registration
Steps:
  1. Navigate to signup page
  2. Select "Owner" role
  3. Fill all required fields
  4. Enter ID number: 1234567890
  5. Enter UPI ID: 1234567890123
  6. Click "Sign Up"
Expected Result: Owner account created, verification stored
```

### 3.2 Listing Management Tests

#### TC-LIST-001: Add Listing
```
Precondition: Owner logged in
Steps:
  1. Navigate to "Add Listing"
  2. Fill listing details (title, description, type, location, price)
  3. Upload images
  4. Click "Submit"
Expected Result: Listing created with status PENDING
```

#### TC-LIST-002: View Listing Status
```
Precondition: Owner has submitted listing
Steps:
  1. Navigate to "My Listings"
  2. View listing
Expected Result: Status shows PENDING, APPROVED, or REJECTED
```

#### TC-LIST-003: Edit Listing
```
Precondition: Owner has approved listing
Steps:
  1. Navigate to "My Listings"
  2. Click "Edit" on listing
  3. Update price
  4. Click "Save"
Expected Result: Listing updated successfully
```

### 3.3 Admin Approval Tests

#### TC-ADMIN-001: Review Pending Listing
```
Precondition: Admin logged in, pending listings exist
Steps:
  1. Navigate to "Pending Listings"
  2. Click listing to review
  3. View owner verification details
Expected Result: All listing details and verification visible
```

#### TC-ADMIN-002: Approve Listing
```
Precondition: Admin reviewing pending listing
Steps:
  1. Click "Approve" button
  2. Confirm action
Expected Result: Listing status changed to APPROVED, owner notified
```

#### TC-ADMIN-003: Reject Listing
```
Precondition: Admin reviewing pending listing
Steps:
  1. Click "Reject" button
  2. Enter rejection reason
  3. Confirm action
Expected Result: Listing status changed to REJECTED, owner notified with reason
```

### 3.4 Booking Tests

#### TC-BOOK-001: Create Booking
```
Precondition: Renter logged in, approved listing exists
Steps:
  1. Navigate to listing
  2. Select start date
  3. Select end date
  4. Click "Book"
Expected Result: Booking created with status PENDING
```

#### TC-BOOK-002: View Bookings
```
Precondition: Renter has bookings
Steps:
  1. Navigate to "My Bookings"
Expected Result: All bookings displayed with status and dates
```

#### TC-BOOK-003: Cancel Booking
```
Precondition: Renter has pending booking
Steps:
  1. Navigate to "My Bookings"
  2. Click "Cancel" on booking
  3. Confirm cancellation
Expected Result: Booking status changed to CANCELLED
```

### 3.5 Multi-Language Tests

#### TC-LANG-001: Switch Language
```
Precondition: User on any page
Steps:
  1. Click language switcher
  2. Select "Kinyarwanda"
Expected Result: All UI text changes to Kinyarwanda
```

#### TC-LANG-002: Language Persistence
```
Precondition: User selected French
Steps:
  1. Refresh page
Expected Result: Page still displays in French
```

### 3.6 Accessibility Tests

#### TC-A11Y-001: Keyboard Navigation
```
Precondition: User on login page
Steps:
  1. Press Tab to navigate through form fields
  2. Press Enter to submit
Expected Result: All interactive elements accessible via keyboard
```

#### TC-A11Y-002: Screen Reader Support
```
Precondition: Screen reader enabled
Steps:
  1. Navigate page with screen reader
Expected Result: All content readable, labels descriptive
```

#### TC-A11Y-003: Color Contrast
```
Precondition: Page loaded
Steps:
  1. Run axe DevTools
Expected Result: No color contrast violations
```

### 3.7 Security Tests

#### TC-SEC-001: XSS Prevention
```
Precondition: Listing form open
Steps:
  1. Enter "<script>alert('XSS')</script>" in title
  2. Submit form
Expected Result: Script not executed, text displayed as-is
```

#### TC-SEC-002: Input Validation
```
Precondition: Listing form open
Steps:
  1. Leave required fields empty
  2. Click submit
Expected Result: Validation errors displayed
```

#### TC-SEC-003: Role-Based Access
```
Precondition: Renter logged in
Steps:
  1. Try to access /admin/dashboard
Expected Result: Access denied, redirected to renter dashboard
```

---

## 4. TEST EXECUTION PLAN

### 4.1 Testing Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| Unit Testing | Week 1-2 | Write and run unit tests |
| Integration Testing | Week 2-3 | Test component interactions |
| E2E Testing | Week 3 | Test complete workflows |
| Accessibility Testing | Week 3 | WCAG AA compliance check |
| Performance Testing | Week 4 | Load and optimization |
| UAT | Week 4 | User acceptance testing |

### 4.2 Test Environment

```
Development:
  - Local machine
  - Node.js 18+
  - npm/yarn
  - Browser: Chrome, Firefox

Staging:
  - Docker container
  - Netlify preview deployment
  - Same as production

Production:
  - Netlify CDN
  - Global distribution
  - Monitoring enabled
```

### 4.3 Test Data

**Demo Accounts**:
```
Admin:
  Email: admin@umukomisiyoneri.com
  Password: admin123

Renter:
  Email: renter@test.com
  Password: renter123

Owner:
  Email: owner@test.com
  Password: owner123
```

**Test Listings**:
- 5 approved listings
- 3 pending listings
- 2 rejected listings

**Test Bookings**:
- 5 confirmed bookings
- 3 pending bookings
- 2 cancelled bookings

---

## 5. DEFECT REPORTING

### 5.1 Defect Template

```
Title: [Component] Brief description
Severity: Critical | High | Medium | Low
Priority: P1 | P2 | P3 | P4

Description:
What is the issue?

Steps to Reproduce:
1. Step 1
2. Step 2
3. Step 3

Expected Result:
What should happen?

Actual Result:
What actually happened?

Environment:
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop

Attachments:
- Screenshot
- Video
```

### 5.2 Severity Levels

| Severity | Impact | Example |
|----------|--------|---------|
| Critical | System unusable | Login not working |
| High | Major feature broken | Bookings not saving |
| Medium | Feature partially broken | UI misalignment |
| Low | Minor issue | Typo in text |

---

## 6. TEST METRICS

### 6.1 Coverage Goals

```
Code Coverage:
  - Statements: 80%+
  - Branches: 75%+
  - Functions: 80%+
  - Lines: 80%+

Test Distribution:
  - Unit Tests: 70%
  - Integration Tests: 20%
  - E2E Tests: 10%
```

### 6.2 Quality Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test Pass Rate | 100% | - |
| Code Coverage | 80%+ | - |
| Defect Density | < 5 per 1000 LOC | - |
| Performance | < 2s load time | - |
| Accessibility | 0 violations | - |

---

## 7. TESTING TOOLS

### 7.1 Unit Testing: Vitest

```bash
npm install -D vitest @vue/test-utils happy-dom
```

**Configuration** (`vitest.config.js`):
```javascript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
```

### 7.2 E2E Testing: Playwright

```bash
npm install -D @playwright/test
```

### 7.3 Accessibility Testing

- **axe DevTools**: Browser extension
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools built-in

### 7.4 Performance Testing

- **Lighthouse**: Chrome DevTools
- **WebPageTest**: Online tool
- **Chrome DevTools**: Network and performance tabs

---

## 8. CONTINUOUS INTEGRATION

### 8.1 GitHub Actions Workflow

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
      - run: npm run test
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

---

## 9. SIGN-OFF

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | - | - | - |
| Dev Lead | - | - | - |
| Project Manager | - | - | - |

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Status**: Complete
