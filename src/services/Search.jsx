import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();
    if (trimmedCity === "") {
      alert("Inserisci il nome di una città");
      return;
    }
    navigate(`/detail/${trimmedCity}`);
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
                onChange={(e) => setCity(e.target.value)}
                className="search-input"
              />
              <button type="submti" className="search-button">
                🔍 Cerca
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
