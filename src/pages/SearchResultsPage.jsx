import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { getRestaurants } from '../services/api';

export default function SearchResultsPage({ selection }) {
  const [params] = useSearchParams();
  const state = params.get('state') || selection.state;
  const city = params.get('city') || selection.city;
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!state || !city) { setLoading(false); return; }
    setLoading(true);
    getRestaurants(state, city).then(data => { if (active) { setRestaurants(data); setLoading(false); } });
    return () => { active = false; };
  }, [state, city]);

  return (
    <section className="page-section results-page">
      <div className="container">
        <div className="breadcrumbs"><Link to="/">Home</Link> <span>›</span> Restaurants</div>
        <div className="results-header"><div><span className="eyebrow">RESTAURANTS</span><h1>{loading ? 'Finding restaurants...' : `${restaurants.length} restaurants available in ${city}`}</h1><p>Explore restaurants in {city}, {state} and reserve your table.</p></div><Link to="/" className="secondary-btn">Change location</Link></div>
        {loading ? <div className="loading-card">Loading restaurants...</div> : restaurants.length ? <div className="restaurant-grid">{restaurants.map((restaurant, index) => <RestaurantCard key={`${restaurant.restaurantName}-${index}`} restaurant={restaurant} />)}</div> : <div className="empty-state"><div>🍽️</div><h2>No restaurants found</h2><p>Try another city or state.</p><Link to="/" className="primary-btn">Search again</Link></div>}
      </div>
    </section>
  );
}
