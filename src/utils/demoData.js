// Initialize demo data for testing
export function initializeDemoData() {
  // Check if data already exists
  if (localStorage.getItem('users')) return

  // Demo users
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@umukomisiyoneri.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'John Renter',
      email: 'renter@test.com',
      password: 'renter123',
      phone: '+250 788 123 456',
      role: 'renter',
      idNumber: '1199970012345678',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Jane Owner',
      email: 'owner@test.com',
      password: 'owner123',
      phone: '+250 788 654 321',
      role: 'owner',
      idNumber: '1199980012345678',
      upiId: 'janeowner@bank',
      createdAt: new Date().toISOString()
    }
  ]

  // Demo listings
  const listings = [
    {
      id: '1',
      type: 'house',
      title: 'Modern 2-Bedroom Apartment in Kigali',
      description: 'Beautiful apartment with stunning city views. Fully furnished with modern amenities.',
      location: 'Kigali, Kicukiro',
      price: 80,
      rentalPeriod: 'day',
      photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      amenities: ['Wi-Fi', 'Kitchen', 'Parking', 'Air Conditioning'],
      rules: 'No smoking\nNo pets\nQuiet hours: 10 PM - 7 AM',
      ownerId: '3',
      ownerName: 'Jane Owner',
      idNumber: '1199980012345678',
      upiId: 'janeowner@bank',
      status: 'approved',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      bookedDates: []
    },
    {
      id: '2',
      type: 'car',
      title: 'Toyota RAV4 2022',
      description: 'Reliable SUV perfect for city and countryside trips. Well maintained and clean.',
      location: 'Kigali, Gasabo',
      price: 50,
      rentalPeriod: 'day',
      photos: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'],
      features: ['Air Conditioning', 'Automatic', 'Bluetooth', 'GPS'],
      rules: 'Valid driving license required\nFull tank return policy',
      ownerId: '3',
      ownerName: 'Jane Owner',
      idNumber: '1199980012345678',
      upiId: 'janeowner@bank',
      status: 'approved',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      bookedDates: []
    },
    {
      id: '3',
      type: 'house',
      title: 'Cozy Studio Near City Center',
      description: 'Perfect for solo travelers or couples. Walking distance to restaurants and shops.',
      location: 'Kigali, Nyarugenge',
      price: 45,
      rentalPeriod: 'day',
      photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
      amenities: ['Wi-Fi', 'Kitchen', 'TV'],
      rules: 'No parties',
      ownerId: '3',
      ownerName: 'Jane Owner',
      idNumber: '1199980012345678',
      upiId: 'janeowner@bank',
      status: 'pending',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      bookedDates: []
    }
  ]

  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('listings', JSON.stringify(listings))
  localStorage.setItem('bookings', JSON.stringify([]))
}
