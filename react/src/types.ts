export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  type: 'Coach' | 'Student';
}

export interface Slot {
  id: number;
  coach: User;
  start_time: string;
  end_time: string;
  booking?: Booking;
}

export interface Booking {
  id: number;
  slot: Slot;
  student_id: number;
  satisfaction_rating?: number;
  notes?: string;
  student: User;
  completed?: boolean;
}
