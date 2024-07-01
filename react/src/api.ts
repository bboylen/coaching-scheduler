import { Slot, User, Booking } from './types';

const API_URL = 'http://localhost:3000/api/v1';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function fetchCoachSlots(coachId: number): Promise<Slot[]> {
  const response = await fetch(`${API_URL}/slots/coach/${coachId}`);
  return response.json();
}

export async function fetchCoachBookings(coachId: number): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings/coach/${coachId}`);
  return response.json();
}

export async function fetchStudentBookings(studentId: number): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings/student/${studentId}`);
  return response.json();
}

export async function completeCall(bookingId: number, satisfactionScore: number, notes: string): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      booking: {
        id: bookingId,
        satisfaction_rating: satisfactionScore,
        notes: notes,
        completed: true
      }
    }),
  });
  return response.json();
}

export async function createSlot(slotData: Omit<Slot, 'id'>): Promise<Slot> {
  const response = await fetch(`${API_URL}/slots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slotData),
  });
  return response.json();
}

export async function fetchAvailableSlots(): Promise<Slot[]> {
  const response = await fetch(`${API_URL}/slots/available`);
  return response.json();
}

export async function bookSlot(slotId: number, studentId: number): Promise<Slot> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      booking: {
        slot_id: slotId,
        student_id: studentId
      }
    }),
  });
  return response.json();
}
