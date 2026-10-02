export const API_BASE_URL = 'https://restaurantdata.onrender.com';
export const BOOKINGS_KEY = 'bookings';
export const DEFAULT_STATES = ['Alabama', 'Arizona', 'California', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas', 'Washington'];
export const FALLBACK_CITIES = {
  Texas: ['Austin', 'Dallas', 'Houston', 'San Antonio'],
  California: ['Los Angeles', 'San Diego', 'San Francisco'],
  NewYork: ['New York'],
  Florida: ['Miami', 'Orlando', 'Tampa']
};
export const FALLBACK_RESTAURANTS = [
  {
    restaurantName: 'Austin Food Expo', rating: 4, address: '555 Main St, Austin, Texas', city: 'Austin', state: 'Texas'
  },
  {
    restaurantName: 'Culinary Carnival', rating: 4.5, address: '280 Main St, Austin, Texas', city: 'Austin', state: 'Texas'
  }
];
export const TIME_GROUPS = [
  { label: 'Morning', icon: '☀', slots: ['10:00 AM', '10:30 AM', '11:00 AM'] },
  { label: 'Afternoon', icon: '☼', slots: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'] },
  { label: 'Evening', icon: '◐', slots: ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'] }
];
