export interface User {
  name: string;
  points: number;
  bloodType: string;
  preferences: {
    notifications: boolean;
    preferredCenters: string[];
  };
}

export interface Center {
  id: string;
  name: string;
  address: string;
  distance: string;
  hours: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  centerId: string;
  centerName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface BloodNeed {
  id: string;
  type: string;
  urgency: 'Critical' | 'High' | 'Moderate';
  location: string;
  requester: string;
}

export interface InventoryItem {
  type: string;
  level: number; // 0-100%
}