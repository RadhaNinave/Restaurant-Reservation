import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationDropdown from './LocationDropdown';
import { getCities, getStates } from '../services/api';
import { DEFAULT_STATES, FALLBACK_CITIES } from '../utils/constants';

export default function SearchForm({ selection, setSelection }) {
  const navigate = useNavigate();
  const [states, setStates] = useState(DEFAULT_STATES);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    let active = true;
    getStates().then(data => { if (active) { setStates(data); setLoadingStates(false); } });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selection.state) {
      setCities([]);
      return;
    }
    let active = true;
    const fallback = FALLBACK_CITIES[selection.state === 'New York' ? 'NewYork' : selection.state] || [];
    setCities(fallback);
    setLoadingCities(false);
    getCities(selection.state).then(data => { if (active && data.length) setCities(data); });
    return () => { active = false; };
  }, [selection.state]);

  const handleState = (state) => setSelection({ state, city: '' });
  const handleCity = (city) => setSelection(current => ({ ...current, city }));
  const handleSearch = () => {
    if (!selection.state || !selection.city) return;
    navigate(`/search?state=${encodeURIComponent(selection.state)}&city=${encodeURIComponent(selection.city)}`);
  };

  return (
    <div className="search-panel" id="locations">
      <div className="search-intro">
        <span className="eyebrow">FIND YOUR TABLE</span>
        <h2>Where would you like to eat?</h2>
        <p>Select your location and discover restaurants near you.</p>
      </div>
      <div className="search-fields">
        <LocationDropdown id="state" label="State" value={selection.state} options={states} placeholder={loadingStates ? 'Loading states...' : 'Select state'} onChange={handleState} />
        <LocationDropdown id="city" label="City" value={selection.city} options={cities} disabled={!selection.state} placeholder={loadingCities ? 'Loading cities...' : 'Select city'} onChange={handleCity} />
        <button id="searchBtn" type="submit" className="primary-btn search-btn" onClick={handleSearch}>Search <span>→</span></button>
      </div>
    </div>
  );
}
