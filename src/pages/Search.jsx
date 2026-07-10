import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCity } from "../services/weatherService";
import "./Search.css";

const Search = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();
    if (trimmedCity === "") {
      alert("Inserisci il nome di una città");
      return;
    }

    setLoading(true);
    setShowSuggestions(false);

    try {
      const results = await searchCity(trimmedCity);

      if (results.length === 1) {
        const r = results[0];
        navigate(`/detail/${encodeURIComponent(r.name)}?lat=${r.lat}&lon=${r.lon}`);
      } else {
        setSuggestions(results);
        setShowSuggestions(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (r) => {
    setShowSuggestions(false);
    navigate(`/detail/${encodeURIComponent(r.name)}?lat=${r.lat}&lon=${r.lon}`);
  };

  return (
    <>
      <div className="search-page">
        <div className="search-container text-center">
          <h1>🔍 Cerca una città</h1>
          <p className="search-description">
            Inserisci il nome di una città per visualizzare le condizioni meteo
            attuali e le previsioni dei prossimi giorni.
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="es. Roma, Catanzaro, Napoli, Londra..."
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (showSuggestions) setShowSuggestions(false);
                }}
                className="search-input"
              />
              <button type="submit" className="search-button" disabled={loading}>
                {loading ? "⏳" : "🔍"} Cerca
              </button>
            </div>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              <p className="suggestions-title">
                Sono state trovate più città. Seleziona quella giusta:
              </p>
              <div className="suggestions-list">
                {suggestions.map((r, index) => (
                  <button
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSelectCity(r)}
                  >
                    <span className="suggestion-name">
                      {r.name}{r.state ? `, ${r.state}` : ""}
                    </span>
                    <span className="suggestion-country">{r.country}</span>
                    <span className="suggestion-coords">
                      {r.lat.toFixed(2)}°, {r.lon.toFixed(2)}°
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;