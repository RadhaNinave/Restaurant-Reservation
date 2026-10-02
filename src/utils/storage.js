import { BOOKINGS_KEY } from './constants';

export function readBookings() {
  try {
    const value = localStorage.getItem(BOOKINGS_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
