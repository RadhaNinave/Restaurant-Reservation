import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

export default function App() {
  const [selection, setSelection] = useState({ state: '', city: '' });
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage selection={selection} setSelection={setSelection} />} />
          <Route path="/search" element={<SearchResultsPage selection={selection} />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="*" element={<HomePage selection={selection} setSelection={setSelection} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
