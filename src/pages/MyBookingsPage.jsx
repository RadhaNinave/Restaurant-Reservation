import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readBookings } from '../utils/storage';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => { setBookings(readBookings()); }, []);
  return <section className="page-section bookings-page"><div className="container"><div className="bookings-header"><div><span className="eyebrow">YOUR RESERVATIONS</span><h1>My Bookings</h1><p>Keep track of your upcoming and previous restaurant reservations.</p></div><Link to="/" className="primary-btn">Find a Restaurant</Link></div>{bookings.length ? <div className="booking-list">{bookings.map((booking, index) => <article className="saved-booking" key={`${booking.restaurantName}-${booking.bookingDate}-${index}`}><div className="saved-icon">🍽️</div><div className="saved-content"><div className="restaurant-title-row"><h3>{booking.restaurantName}</h3><span className="rating">★ {booking.rating}</span></div><p>{booking.address}</p><div className="saved-details"><span>📅 {formatBookingDate(booking.bookingDate)}</span><span>🕐 {booking.bookingTime}</span><span>✉ {booking.bookingEmail}</span></div></div></article>)}</div> : <div className="empty-state"><div>📅</div><h2>No bookings yet</h2><p>Your confirmed reservations will appear here.</p><Link to="/" className="primary-btn">Find a Restaurant</Link></div>}</div></section>;
}
function formatBookingDate(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
