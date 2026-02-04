export interface Admin {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone: string;
  joinDate: string;
  qrCode?: string;
  registeredEvents: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  registeredCount: number;
  capacity?: number;
}

export interface Discount {
  id: string;
  title: string;
  description: string;
  percentage: number;
  location: string;
  image?: string;
  logo?: string;
  expiryDate?: string;
  category: string;
  registeredCount?: number;
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
