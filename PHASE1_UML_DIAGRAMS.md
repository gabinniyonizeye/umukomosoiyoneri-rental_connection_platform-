# UML DIAGRAMS - UMUKOMISIYONERI SYSTEM

## 1. USE CASE DIAGRAM

```
@startuml UseCase
left to right direction
actor Renter
actor Owner
actor Admin
actor System

rectangle Umukomisiyoneri {
  usecase UC1 as "Browse Listings"
  usecase UC2 as "View Listing Details"
  usecase UC3 as "Book Property/Car"
  usecase UC4 as "Manage Bookings"
  usecase UC5 as "Register as Owner"
  usecase UC6 as "Add Listing"
  usecase UC7 as "View Listing Status"
  usecase UC8 as "Manage Listings"
  usecase UC9 as "Review Pending Listings"
  usecase UC10 as "Approve/Reject Listing"
  usecase UC11 as "Manage Users"
  usecase UC12 as "View Reports"
  usecase UC13 as "Login/Signup"
  usecase UC14 as "Switch Language"
  usecase UC15 as "Access Profile"

  Renter --> UC1
  Renter --> UC2
  Renter --> UC3
  Renter --> UC4
  Renter --> UC13
  Renter --> UC14
  Renter --> UC15

  Owner --> UC5
  Owner --> UC6
  Owner --> UC7
  Owner --> UC8
  Owner --> UC13
  Owner --> UC14
  Owner --> UC15

  Admin --> UC9
  Admin --> UC10
  Admin --> UC11
  Admin --> UC12
  Admin --> UC13
  Admin --> UC14

  System --> UC13
  System --> UC14
}
@enduml
```

**Use Case Descriptions**:
- **UC1-UC4**: Renter browsing and booking functionality
- **UC5-UC8**: Owner listing management
- **UC9-UC12**: Admin oversight and management
- **UC13-UC15**: System-wide features

---

## 2. CLASS DIAGRAM

```
@startuml ClassDiagram
class User {
  -id: String
  -email: String
  -password: String
  -name: String
  -phone: String
  -role: String (Renter|Owner|Admin)
  -isBlocked: Boolean
  -createdAt: Date
  +login(): Boolean
  +logout(): void
  +updateProfile(): void
  +getRole(): String
}

class Owner {
  -idNumber: String
  -upiId: String
  -isVerified: Boolean
  +addListing(): Listing
  +updateListing(): void
  +deleteListing(): void
  +getListings(): Listing[]
  +getVerificationStatus(): String
}

class Renter {
  -bookingHistory: Booking[]
  +browseListings(): Listing[]
  +searchListings(): Listing[]
  +bookListing(): Booking
  +cancelBooking(): void
  +getBookings(): Booking[]
}

class Admin {
  -permissions: String[]
  +approveListing(): void
  +rejectListing(): void
  +blockUser(): void
  +unblockUser(): void
  +getReports(): Report
  +viewAllListings(): Listing[]
}

class Listing {
  -id: String
  -ownerId: String
  -title: String
  -description: String
  -type: String (House|Car)
  -location: String
  -price: Number
  -images: String[]
  -status: String (Pending|Approved|Rejected)
  -rejectionReason: String
  -createdAt: Date
  +updateStatus(): void
  +getDetails(): Object
  +getAvailableDates(): Date[]
}

class Booking {
  -id: String
  -listingId: String
  -renterId: String
  -startDate: Date
  -endDate: Date
  -status: String (Pending|Confirmed|Cancelled)
  -createdAt: Date
  +confirm(): void
  +cancel(): void
  +getDetails(): Object
}

class Notification {
  -id: String
  -userId: String
  -message: String
  -type: String
  -isRead: Boolean
  -createdAt: Date
  +markAsRead(): void
}

class Report {
  -id: String
  -type: String
  -data: Object
  -generatedAt: Date
  +generate(): void
  +export(): String
}

User <|-- Owner
User <|-- Renter
User <|-- Admin
Owner "1" --> "*" Listing
Renter "1" --> "*" Booking
Listing "1" --> "*" Booking
User "1" --> "*" Notification
Admin "1" --> "*" Report

@enduml
```

**Class Relationships**:
- **Inheritance**: Owner, Renter, Admin extend User
- **Composition**: Owner has Listings, Renter has Bookings
- **Association**: Listing has Bookings, User has Notifications

---

## 3. ACTIVITY DIAGRAM - LISTING APPROVAL WORKFLOW

```
@startuml ActivityDiagram
start
:Owner registers with verification;
:Owner adds listing details;
:Owner uploads images;
:Owner submits for approval;
:System stores listing as PENDING;
:Admin receives notification;
:Admin reviews listing;
if (Listing valid?) then (Yes)
  :Admin approves listing;
  :System updates status to APPROVED;
  :Owner receives approval notification;
  :Listing visible to renters;
else (No)
  :Admin provides rejection reason;
  :System updates status to REJECTED;
  :Owner receives rejection notification;
  :Owner can edit and resubmit;
  :System stores as PENDING again;
endif
:Renter can now book listing;
:Booking created;
:Owner receives booking notification;
:Owner confirms/rejects booking;
stop
@enduml
```

---

## 4. ACTIVITY DIAGRAM - BOOKING WORKFLOW

```
@startuml BookingActivity
start
:Renter browses listings;
:Renter selects listing;
:Renter views details;
:Renter selects dates;
:Renter confirms booking;
:System creates booking;
:System checks availability;
if (Dates available?) then (Yes)
  :Booking status = PENDING;
  :Owner receives notification;
  :Owner reviews booking;
  if (Owner accepts?) then (Yes)
    :Booking status = CONFIRMED;
    :Renter receives confirmation;
  else (No)
    :Booking status = CANCELLED;
    :Renter receives rejection;
  endif
else (No)
  :System shows error;
  :Renter selects new dates;
endif
stop
@enduml
```

---

## 5. SEQUENCE DIAGRAM - LISTING APPROVAL PROCESS

```
@startuml SequenceDiagram
actor Owner
participant "Frontend" as FE
participant "Store (Pinia)" as Store
participant "LocalStorage" as DB
actor Admin

Owner -> FE: Fill listing form
FE -> Store: addListing(data)
Store -> DB: Save listing (status: PENDING)
DB --> Store: Confirm save
Store --> FE: Update UI
FE --> Owner: Show success message

Admin -> FE: Login as Admin
FE -> Store: fetchPendingListings()
Store -> DB: Query listings (status: PENDING)
DB --> Store: Return listings
Store --> FE: Display listings

Admin -> FE: Click "Review Listing"
FE -> Store: getListingDetails(id)
Store -> DB: Fetch listing
DB --> Store: Return details
Store --> FE: Display details

Admin -> FE: Click "Approve"
FE -> Store: approveListing(id)
Store -> DB: Update status to APPROVED
DB --> Store: Confirm update
Store --> FE: Update UI
FE --> Admin: Show confirmation

Store -> Store: Trigger notification
Store --> Owner: Notification sent
@enduml
```

---

## 6. SEQUENCE DIAGRAM - BOOKING PROCESS

```
@startuml BookingSequence
actor Renter
participant "Frontend" as FE
participant "Store" as Store
participant "LocalStorage" as DB
actor Owner

Renter -> FE: Select listing
FE -> Store: getListingDetails(id)
Store -> DB: Fetch listing
DB --> Store: Return listing
Store --> FE: Display details

Renter -> FE: Select dates & book
FE -> Store: createBooking(listingId, dates)
Store -> DB: Check availability
DB --> Store: Dates available
Store -> DB: Save booking (status: PENDING)
DB --> Store: Confirm save
Store --> FE: Show confirmation
FE --> Renter: Booking created

Store -> Store: Notify owner
Store --> Owner: Booking notification

Owner -> FE: Login
FE -> Store: getBookings()
Store -> DB: Fetch bookings
DB --> Store: Return bookings
Store --> FE: Display bookings

Owner -> FE: Confirm booking
FE -> Store: confirmBooking(id)
Store -> DB: Update status to CONFIRMED
DB --> Store: Confirm update
Store --> FE: Update UI

Store -> Store: Notify renter
Store --> Renter: Confirmation notification
@enduml
```

---

## 7. COMPONENT DIAGRAM

```
@startuml ComponentDiagram
package "Presentation Layer" {
  component [Views] as Views
  component [Components] as Components
  component [LanguageSwitcher] as LS
}

package "Business Logic Layer" {
  component [Router] as Router
  component [Stores (Pinia)] as Stores
  component [Composables] as Composables
}

package "Data Layer" {
  component [LocalStorage] as Storage
  component [DemoData] as DemoData
}

package "Utilities" {
  component [Validation] as Validation
  component [Crypto] as Crypto
  component [Agreements] as Agreements
}

Views --> Router
Views --> Components
Views --> Stores
Components --> Stores
Components --> LS
Router --> Stores
Stores --> Storage
Stores --> DemoData
Stores --> Validation
Stores --> Crypto
Stores --> Agreements
LS --> Composables
Composables --> Storage

@enduml
```

**Component Responsibilities**:
- **Presentation**: Vue components and views
- **Business Logic**: Router, Pinia stores, composables
- **Data**: LocalStorage and demo data
- **Utilities**: Validation, encryption, agreements

---

## 8. STATE DIAGRAM - LISTING LIFECYCLE

```
@startuml StateDiagram
[*] --> DRAFT
DRAFT --> PENDING: Submit for approval
PENDING --> APPROVED: Admin approves
PENDING --> REJECTED: Admin rejects
REJECTED --> PENDING: Owner resubmits
APPROVED --> ACTIVE: Listing goes live
ACTIVE --> INACTIVE: Owner deactivates
INACTIVE --> ACTIVE: Owner reactivates
ACTIVE --> ARCHIVED: Listing expired
ARCHIVED --> [*]
REJECTED --> [*]
@enduml
```

---

## 9. DEPLOYMENT DIAGRAM

```
@startuml DeploymentDiagram
artifact "Browser" as Browser
artifact "Vue 3 App" as App
artifact "Pinia Store" as Store
artifact "LocalStorage" as Storage
artifact "Netlify CDN" as CDN

Browser --> App
App --> Store
Store --> Storage
App --> CDN

@enduml
```

---

## How to View These Diagrams

1. **Online**: Copy any diagram code to [PlantUML Online Editor](http://www.plantuml.com/plantuml/uml/)
2. **VS Code**: Install PlantUML extension and preview
3. **Generate PNG**: Use PlantUML CLI: `plantuml diagram.puml`

---

**Diagram Version**: 1.0  
**Last Updated**: 2025  
**Format**: PlantUML
