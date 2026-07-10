import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCurrentWeather, getForecast } from "../services/weatherService";
// import "./Detail.css";

const Detail = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const weatherData = await getCurrentWeather(city);
        const forecastData = await getForecast(city);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  if (loading) {
    return (
      <div className="detail-page text-center">
        <div className="loading-spinner"></div>
        <p className="mt-3">Carciamento dati meteo per {city}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page text-center">
        <div className="error-container">
          <h2>❌ {error}</h2>
          <Link to="/search" className="back-link">
            Torna alla ricerca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="weather-card">
        <div className="weather-header">
          <h1>
            {weather.name}, {weather.sys.country}
          </h1>
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="weather-main">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{Math.round(weather.main.temp)}°</span>
            <span className="temp-unit">C</span>
          </div>
        </div>
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">🌡️ Percepita</span>
            <span className="deatail-value">
              {Math.round(weather.main.feels_like)}°C
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">💧 Umidità</span>
            <span className="detail-value">
              {Math.round(weather.main.humidity)}%
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">💨 Vento</span>
            <span className="deatail-value">
              {" "}
              {Math.round(weather.wind.speed * 3.6)} km/h
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📊 Pressione</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>
      <div className="forecast-section">
        <h2>Previsioni prossimi giorni</h2>
        <div className="forecast-grid">
          {forecast.list
            .filter((item) => item.dt_txt.includes("12:00:00"))
            .slice(0, 5)
            .map((day) => (
              <div key={day.dt} className="forecast-card">
                <p className="forecast-date">
                  {new Date(day.dt_txt).toLocaleDateString("it-IT", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                <p className="forecast-desc">{day.weather[0].description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
