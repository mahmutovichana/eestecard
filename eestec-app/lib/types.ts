export interface Admin {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  studentId: string;
  phone?: string;
  position?: string;
  status: 'active' | 'inactive' | 'alumni';
  joinDate: string;
  registeredEvents: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  endDate?: string | null; // za multi-day events
  time?: string | null; // HH:MM
  location: string;
  // Image/Banner
  image?: string;
  imageUrl?: string;
  // Participants
  numberOfParticipants?: number;
  participantCount?: number;
  capacity: number;
  // Event Type
  isSingleDay: boolean;
  duration?: string;
  // Registration & Links
  registrationFormLink?: string;
  registrationFormUrl?: string;
  websiteLink?: string;
  websiteUrl?: string;
  // Status
  registeredCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Discount {
  id: string;
  title: string;
  description: string;
  partnerName: string;
  discountPercentage: number;
  discountDescription?: string;
  category: string;
  imageUrl?: string;
  logoUrl?: string;
  validFrom?: string;
  validUntil: string;
  terms?: string;
  qrCodeUrl?: string;
  redemptionCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Location {
  name: string;
  address: string;
  phone: string[];
  email: string[];
  mapUrl: string;
  latitude: number;
  longitude: number;
  hours?: string;
}

export interface AppConfig {
  location: Location;
  linktreeUrl?: string;
  socialLinks?: Record<string, string>;
}
