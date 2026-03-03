# Umukomisiyoneri - Rental Marketplace Platform

A human-centered three-role marketplace connecting owners of idle assets (houses, cars) with renters, featuring admin approval workflow for safety and trust.

## 🎯 Project Overview

Umukomisiyoneri is a Vue 3 application built with Vite and Tailwind CSS that demonstrates:
- **Three distinct user roles**: Renter, Owner, and Admin
- **Admin approval workflow**: All listings must be reviewed before going live
- **Anti-scam measures**: Owner verification with ID and payment details
- **Accessibility-first design**: WCAG AA compliant, keyboard navigable, screen reader friendly
- **Multi-language support**: English, Kinyarwanda, and French

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone repository
git clone https://github.com/gabinniyonizeye/umukomosoiyoneri-rental_connection_platform-.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Demo Accounts

**Admin:**
- Email: `admin@umukomisiyoneri.com`
- Password: `admin123`

**Renter:**
- Email: `renter@test.com`
- Password: `renter123`

**Owner:**
- Email: `owner@test.com`
- Password: `owner123`

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable Vue components
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   ├── ListingCard.vue
│   ├── NavBar.vue
│   ├── LanguageSwitcher.vue
│   └── NotificationBell.vue
├── views/           # Page components
│   ├── WelcomePage.vue
│   ├── LoginPage.vue
│   ├── SignupPage.vue
│   ├── RenterDashboard.vue
│   ├── OwnerDashboard.vue
│   ├── AdminDashboard.vue
│   ├── AddListing.vue
│   ├── ListingDetail.vue
│   ├── MyBookings.vue
│   ├── OwnerBookings.vue
│   ├── AdminUsers.vue
│   ├── AdminReports.vue
│   ├── UserProfile.vue
│   └── BlockedAccount.vue
├── router/          # Vue Router configuration
│   └── index.js
├── stores/          # Pinia state management
│   ├── auth.js
│   ├── listings.js
│   └── bookings.js
├── composables/     # Reusable composition functions
│   └── useLanguage.js
├── utils/           # Utility functions
│   ├── demoData.js
│   └── agreements.js
├── App.vue          # Root component
├── main.js          # Application entry point
└── style.css        # Global styles
```

## 🎨 Key Features

### For Renters
- Browse verified listings with search and filters
- View detailed listing information
- Book properties/cars with date selection
- Manage bookings (view and cancel)
- Multi-language interface

### For Owners
- Add new listings with step-by-step form
- Provide verification information (ID, UPI)
- View listing status (pending/approved/rejected)
- Manage all listings in one dashboard
- Receive booking requests

### For Admins
- Review pending listings with full details
- Approve or reject with reason
- View verification information
- Track all listings by status
- Manage users (block/unblock)
- View booking reports

## 🔒 Security Features

1. **Owner Verification**: ID number and UPI ID required at signup
2. **Admin Approval**: Manual review of all listings before publication
3. **Input Validation**: Client-side validation prevents malformed data
4. **XSS Prevention**: Vue's template system escapes user input
5. **Role-Based Access**: Route guards prevent unauthorized access
6. **Account Security**: Blocked account handling

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy, landmarks, and ARIA labels
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Descriptive labels and alt text
- **High Contrast**: WCAG AA compliant color contrast ratios
- **Focus Indicators**: Clear visual focus states
- **Form Validation**: Descriptive error messages

## 🌍 Multi-Language Support

The application supports three languages:
- **English** (en)
- **Kinyarwanda** (rw)
- **French** (fr)

Language preference is saved in localStorage and persists across sessions.

## 🛠️ Technical Stack

- **Vue 3**: Composition API with `<script setup>`
- **Vue Router**: Client-side routing with navigation guards
- **Pinia**: Centralized state management
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server
- **LocalStorage**: Data persistence (prototype)

## 🔄 State Management

### Auth Store (`stores/auth.js`)
- User authentication and session management
- Role-based access control
- Account blocking functionality

### Listings Store (`stores/listings.js`)
- CRUD operations for listings
- Admin approval workflow
- Status filtering (pending/approved/rejected)

### Bookings Store (`stores/bookings.js`)
- Booking creation and management
- Date availability tracking
- Booking status updates

## 🎯 User Flows

### Renter Flow
1. Sign up / Log in
2. Browse approved listings
3. Filter by type, location, price
4. View listing details
5. Select dates and book
6. View bookings in "My Bookings"

### Owner Flow
1. Sign up with verification info
2. Add listing with details
3. Submit for admin review
4. Receive approval/rejection
5. Manage listings and bookings

### Admin Flow
1. Log in
2. View pending listings
3. Review verification details
4. Approve or reject with reason
5. Manage users and view reports

## 🎓 Academic Requirements Met

✅ **Git Usage**: Proper repository structure and workflow
✅ **Three User Roles**: Renter, Owner, Admin
✅ **Authentication**: Login/signup simulation with validation
✅ **Role-Based Dashboards**: Unique views per role
✅ **CRUD Operations**: Create, Read, Update, Delete listings
✅ **Vue Router**: Navigation with route guards
✅ **Pinia**: Centralized state management
✅ **Vue 3 Composition API**: `<script setup>` syntax
✅ **Reusable Components**: BaseButton, BaseInput, ListingCard, etc.
✅ **Props & Emits**: Component communication
✅ **Event Listeners**: @click, @submit, @change
✅ **Directives**: v-model, v-if, v-for, v-show
✅ **Computed Properties**: Filtered lists, calculations
✅ **UX**: Clear navigation, validation, loading states, responsive design
✅ **Accessibility**: Semantic HTML, ARIA, keyboard support
✅ **Security Thinking**: Input validation, XSS prevention, role-based access
✅ **Human-Centered Design**: User personas, user flows, clear feedback

## 📚 Additional Features (Bonus)

- Multi-language support (English, Kinyarwanda, French)
- Profile management with photo upload
- Notification system
- Booking reports for admin
- User management (block/unblock)
- Terms and conditions with translations
- Gradient backgrounds for visual appeal
- Responsive design for all screen sizes

## 🧪 Testing the Application

1. Start with Welcome Page
2. Sign up as Owner with verification
3. Add a listing
4. Log in as Admin and approve
5. Log in as Renter and book
6. Test language switcher
7. Test keyboard navigation

## 📄 License

Academic project for AUCA - Faculty of Information Technology

---

**Built with ❤️ for human-centered design and accessibility**
