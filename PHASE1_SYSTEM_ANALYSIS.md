# PHASE 1: SYSTEM ANALYSIS AND DESIGN
## Umukomisiyoneri - Rental Marketplace Platform

---

## 1. CASE STUDY DESCRIPTION

### 1.1 Organization Overview
**Organization Name**: Umukomisiyoneri Rental Marketplace  
**Industry**: Real Estate & Asset Rental Services  
**Location**: Rwanda (Kigali)  
**Business Model**: Three-sided marketplace connecting property/asset owners with renters

### 1.2 Current Situation
The rental market in Rwanda faces challenges:
- **Fragmented Market**: Owners and renters use multiple platforms (Facebook, WhatsApp, word-of-mouth)
- **Trust Issues**: No verification system for owners or properties
- **Scam Risk**: Unverified listings and untrustworthy transactions
- **Manual Processes**: Booking and approval handled informally
- **Language Barrier**: Limited multi-language support for diverse users

### 1.3 Target Users
- **Renters**: Individuals seeking houses, apartments, or cars
- **Owners**: Property/asset owners wanting to monetize idle assets
- **Admins**: Platform managers ensuring safety and quality

---

## 2. PROBLEM STATEMENT

### 2.1 Problems Identified

| Problem | Impact | Current Solution |
|---------|--------|------------------|
| No centralized platform | Users scattered across multiple channels | Manual search across platforms |
| Unverified owners | High scam risk | No verification mechanism |
| No listing approval | Fraudulent listings go live | None - direct posting |
| Poor user experience | Difficult navigation and booking | Informal processes |
| Language limitations | Excludes non-English speakers | Single language only |
| No booking management | Confusion over availability | Manual coordination |

### 2.2 Business Objectives
1. Create a centralized, trustworthy rental marketplace
2. Implement owner verification to reduce scams
3. Establish admin approval workflow for quality control
4. Provide seamless booking experience
5. Support multiple languages (English, Kinyarwanda, French)
6. Ensure accessibility for all users

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Renter Requirements
- FR1: Browse approved listings with filters (type, location, price)
- FR2: View detailed listing information with images
- FR3: Book properties/cars with date selection
- FR4: Manage bookings (view, cancel)
- FR5: Switch between languages
- FR6: Access user profile and booking history

### 3.2 Owner Requirements
- FR7: Register with verification (ID, UPI)
- FR8: Add listings with detailed information
- FR9: Upload listing images
- FR10: View listing status (pending/approved/rejected)
- FR11: Manage all listings in dashboard
- FR12: Receive booking requests
- FR13: View booking history

### 3.3 Admin Requirements
- FR14: Review pending listings
- FR15: Approve/reject listings with reason
- FR16: View owner verification details
- FR17: Manage users (block/unblock)
- FR18: View booking reports and statistics
- FR19: Track all listings by status

### 3.4 System Requirements
- FR20: Multi-language support (EN, RW, FR)
- FR21: WCAG AA accessibility compliance
- FR22: Responsive design (mobile, tablet, desktop)
- FR23: Data persistence (localStorage for prototype)
- FR24: Role-based access control

---

## 4. NON-FUNCTIONAL REQUIREMENTS

| Category | Requirement |
|----------|-------------|
| Performance | Page load < 2 seconds |
| Availability | 99% uptime |
| Security | Input validation, XSS prevention, role-based access |
| Usability | Intuitive UI, keyboard navigation |
| Accessibility | WCAG AA compliant |
| Scalability | Support 1000+ concurrent users |
| Maintainability | Modular, well-documented code |

---

## 5. FUNCTIONAL DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                  UMUKOMISIYONERI SYSTEM                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  │   RENTER     │      │    OWNER     │      │    ADMIN     │
│  └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
│         │                     │                     │
│         ├─────────────────────┼─────────────────────┤
│         │                     │                     │
│    ┌────▼─────────────────────▼─────────────────────▼────┐
│    │         AUTHENTICATION & AUTHORIZATION              │
│    │  (Login, Signup, Role-Based Access Control)        │
│    └────┬──────────────────────────────────────────────┬─┘
│         │                                              │
│    ┌────▼──────────────────────────────────────────────▼────┐
│    │              CORE BUSINESS LOGIC                       │
│    ├──────────────────────────────────────────────────────┤
│    │  • Listing Management (CRUD)                         │
│    │  • Booking Management                               │
│    │  • Admin Approval Workflow                          │
│    │  • User Verification                               │
│    │  • Notification System                             │
│    └────┬──────────────────────────────────────────────┬─┘
│         │                                              │
│    ┌────▼──────────────────────────────────────────────▼────┐
│    │           DATA PERSISTENCE LAYER                      │
│    │  (LocalStorage - Prototype)                          │
│    └──────────────────────────────────────────────────────┘
│
│    ┌──────────────────────────────────────────────────────┐
│    │         CROSS-CUTTING CONCERNS                       │
│    │  • Multi-language Support                           │
│    │  • Accessibility Features                           │
│    │  • Input Validation                                 │
│    │  • Error Handling                                   │
│    └──────────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────┘
```

---

## 6. KEY ENTITIES & RELATIONSHIPS

```
USER
├── id (PK)
├── email
├── password
├── role (Renter/Owner/Admin)
├── name
├── phone
├── isBlocked
└── createdAt

OWNER (extends USER)
├── idNumber
├── upiId
├── isVerified

LISTING
├── id (PK)
├── ownerId (FK)
├── title
├── description
├── type (House/Car)
├── location
├── price
├── images[]
├── status (Pending/Approved/Rejected)
├── rejectionReason
└── createdAt

BOOKING
├── id (PK)
├── listingId (FK)
├── renterId (FK)
├── startDate
├── endDate
├── status (Pending/Confirmed/Cancelled)
└── createdAt
```

---

## 7. SYSTEM CONSTRAINTS

1. **Data Storage**: Prototype uses localStorage (max 5-10MB)
2. **User Limit**: Designed for up to 1000 concurrent users
3. **Listing Limit**: No hard limit, but performance tested up to 500 listings
4. **File Upload**: Images stored as base64 in localStorage
5. **Session**: No persistent backend, session lost on browser close

---

## 8. ASSUMPTIONS

1. Users have modern browsers (Chrome, Firefox, Safari, Edge)
2. Users have stable internet connection
3. Admin team reviews listings within 24 hours
4. Owners provide accurate verification information
5. No payment processing in prototype (booking confirmation only)

---

## 9. SCOPE

### In Scope
- User authentication and role-based access
- Listing CRUD operations
- Booking management
- Admin approval workflow
- Multi-language support
- Accessibility features
- Responsive design

### Out of Scope
- Payment processing
- Email notifications
- SMS notifications
- Video calls
- Advanced analytics
- Mobile app (web-only)

---

## 10. SUCCESS CRITERIA

✅ All three user roles functional  
✅ Admin approval workflow operational  
✅ Multi-language support working  
✅ WCAG AA accessibility compliance  
✅ Responsive design on all devices  
✅ Zero critical security vulnerabilities  
✅ All functional requirements implemented  
✅ User feedback positive (usability testing)  

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Status**: Complete
