import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">🍴</span>
          <span>
            <strong>Table</strong>Reservation
          </span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Find Restaurants</NavLink>
          <a href="#locations">Locations</a>
          <NavLink to="/my-bookings">Reservations</NavLink>
        </nav>
        <NavLink to="/my-bookings" className="nav-bookings">
          My Bookings
        </NavLink>
      </div>
    </header>
  );
}
