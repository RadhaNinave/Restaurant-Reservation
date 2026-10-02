export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">🍴</span>
            <span>
              <strong>Table</strong>Reservation
            </span>
          </div>
          <p>
            Discover great restaurants and reserve your table in a few clicks.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#locations">Locations</a>
          <a href="/my-bookings">My Bookings</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="mailto:hello@tablereservation.test">Contact Us</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Table Reservation. All rights reserved.
      </div>
    </footer>
  );
}
