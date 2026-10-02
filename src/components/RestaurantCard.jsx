import { useNavigate } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const rating = Number(restaurant.rating ?? restaurant.ratingValue ?? 0);
  return (
    <article className="restaurant-card">
      <div className="restaurant-image">
        <div className="food-placeholder">🍽️</div>
        <span className="free-tag">FREE RESERVATION</span>
      </div>
      <div className="restaurant-content">
        <div className="restaurant-title-row">
          <h3>{restaurant.restaurantName}</h3>
          <span className="rating">★ {rating}</span>
        </div>
        <p className="address">⌖ {restaurant.address}</p>
        <p className="location-text">{restaurant.city}, {restaurant.state}</p>
        <div className="card-bottom">
          <span className="price-note">No booking fee</span>
          <button className="primary-btn small-btn" onClick={() => navigate('/booking', { state: { restaurant } })}>Book FREE Reservation</button>
        </div>
      </div>
    </article>
  );
}
