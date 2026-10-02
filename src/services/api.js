import { API_BASE_URL, DEFAULT_STATES, FALLBACK_CITIES, FALLBACK_RESTAURANTS } from '../utils/constants';

async function request(url, fallback) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    return data;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

export async function getStates() {
  const data = await request(`${API_BASE_URL}/states`, DEFAULT_STATES);
  if (Array.isArray(data)) { const states = data.map(item => typeof item === 'string' ? item : item.state || item.name).filter(Boolean); return states.length ? states : DEFAULT_STATES; }
  if (Array.isArray(data?.states)) { const states = data.states.map(item => typeof item === 'string' ? item : item.state || item.name).filter(Boolean); return states.length ? states : DEFAULT_STATES; }
  return DEFAULT_STATES;
}

export async function getCities(state) {
  const key = state === 'New York' ? 'NewYork' : state;
  const fallback = FALLBACK_CITIES[key] || [];
  const data = await request(`${API_BASE_URL}/cities/${encodeURIComponent(state)}`, fallback);
  if (Array.isArray(data)) { const cities = data.map(item => typeof item === 'string' ? item : item.city || item.name).filter(Boolean); return cities.length ? cities : fallback; }
  if (Array.isArray(data?.cities)) { const cities = data.cities.map(item => typeof item === 'string' ? item : item.city || item.name).filter(Boolean); return cities.length ? cities : fallback; }
  return fallback;
}

export async function getRestaurants(state, city) {
  const fallback = FALLBACK_RESTAURANTS.filter(item => item.state === state && item.city === city);
  const url = `${API_BASE_URL}/restaurants?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`;
  const data = await request(url, fallback);
  return Array.isArray(data) ? data : Array.isArray(data?.restaurants) ? data.restaurants : fallback;
}
