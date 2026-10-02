import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import RestaurantCarousel from '../components/RestaurantCarousel';

export default function HomePage({ selection, setSelection }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">TABLE RESERVATION</span>
            <h1>Good food.<br /><span>Great moments.</span></h1>
            <p>Find your favorite restaurant and book a table without the hassle. Your next memorable meal is just a few clicks away.</p>
            <div className="hero-actions"><a href="#locations" className="primary-btn">Find a Restaurant <span>→</span></a><Link to="/my-bookings" className="secondary-btn">My Bookings</Link></div>
          </div>
          <div className="hero-visual"><div className="hero-circle">🍽️</div><div className="hero-card card-one">⭐ <b>4.8</b><small>Customer rating</small></div><div className="hero-card card-two">✓ <b>Free booking</b><small>No reservation fees</small></div></div>
        </div>
      </section>
      <section className="container search-section"><SearchForm selection={selection} setSelection={setSelection} /></section>
      <section className="container promo-section"><div className="section-heading"><div><span className="eyebrow">SPECIAL OFFERS</span><h2>Today's dining deals</h2></div><span className="heading-note">Limited-time offers</span></div><RestaurantCarousel /></section>
      <section className="how-section"><div className="container"><div className="section-heading centered"><span className="eyebrow">HOW IT WORKS</span><h2>Reserve in three easy steps</h2></div><div className="steps"><div className="step"><span>01</span><h3>Choose a location</h3><p>Select your state and city to see restaurants available near you.</p></div><div className="step"><span>02</span><h3>Pick your table</h3><p>Choose a date and convenient time slot from the available options.</p></div><div className="step"><span>03</span><h3>Enjoy your meal</h3><p>Confirm your reservation and arrive ready for a great experience.</p></div></div></div></section>
    </>
  );
}
