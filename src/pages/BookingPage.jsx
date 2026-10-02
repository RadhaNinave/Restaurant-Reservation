import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import { TIME_GROUPS, FALLBACK_RESTAURANTS } from "../utils/constants";
import { readBookings, saveBookings } from "../utils/storage";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurant = location.state?.restaurant || FALLBACK_RESTAURANTS[0];
  const [date, setDate] = useState(new Date().toISOString());
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dateText = useMemo(
    () =>
      new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [date],
  );

  const book = (event) => {
    event.preventDefault();
    if (!time || !email) {
      setMessage("Please select a time and enter your email.");
      return;
    }
    const bookings = readBookings();
    saveBookings([
      ...bookings,
      {
        ...restaurant,
        bookingDate: date,
        bookingTime: time,
        bookingEmail: email,
      },
    ]);
    setMessage("Your table has been reserved successfully.");
  };

  return (
    <section className="page-section booking-page">
      <div className="container">
        <div className="breadcrumbs">
          <button onClick={() => navigate(-1)}>← Back</button> <span>›</span>{" "}
          Reservation
        </div>
        <div className="booking-layout">
          <div className="booking-main">
            <span className="eyebrow">RESERVE YOUR TABLE</span>
            <h1>Book at {restaurant.restaurantName}</h1>
            <p className="muted">
              Choose your preferred date and time. Reservations are available up
              to one week in advance.
            </p>
            <div className="booking-block">
              <h2>Choose a date</h2>
              <DatePicker value={date} onChange={setDate} />
            </div>
            <div className="booking-block">
              <h2>Choose a time</h2>
              <div className="time-groups">
                {TIME_GROUPS.map((group) => (
                  <div className="time-group" key={group.label}>
                    <p>
                      {group.icon} <strong>{group.label}</strong>
                    </p>
                    <div className="time-slots">
                      {group.slots.map((slot) => (
                        <button
                          key={slot}
                          className={`time-slot ${time === slot ? "active" : ""}`}
                          onClick={() => setTime(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form className="booking-form" onSubmit={book}>
              <label>
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </label>
              <button className="primary-btn" type="submit">
                Confirm FREE Reservation
              </button>
              {message && (
                <p
                  className={
                    message.startsWith("Your")
                      ? "success-message"
                      : "error-message"
                  }
                >
                  {message}
                </p>
              )}
            </form>
          </div>
          <aside className="booking-summary">
            <div className="summary-image">🍽️</div>
            <span className="free-tag">FREE RESERVATION</span>
            <h2>{restaurant.restaurantName}</h2>
            <p>★ {restaurant.rating}</p>
            <p>⌖ {restaurant.address}</p>
            <hr />
            <div>
              <span>Date</span>
              <strong>{dateText}</strong>
            </div>
            <div>
              <span>Time</span>
              <strong>{time || "Select a time"}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
