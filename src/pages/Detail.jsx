import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "../services/weatherService";
import "./Detail.css";

const Detail = () => {
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const country = searchParams.get("country");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const decodedCity = decodeURIComponent(city);

        if (lat && lon) {
          const weatherData = await getCurrentWeatherByCoords(lat, lon);
          const forecastData = await getForecastByCoords(lat, lon);
          setWeather(weatherData);
          setForecast(forecastData);
        } else {
          const weatherData = await getCurrentWeather(decodedCity);
          const forecastData = await getForecast(decodedCity);
          setWeather(weatherData);
          setForecast(forecastData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city, lat, lon]);

  useEffect(() => {
    if (!weather || !UNSPLASH_KEY) return;

    const fetchCityImage = async () => {
      try {
        const query = weather.name;
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}+city+landmark&client_id=${UNSPLASH_KEY}&per_page=1&orientation=landscape`,
        );
        if (!response.ok) return;
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setCityImage(data.results[0].urls.regular);
        }
      } catch {
        // Silenzioso — se fallisce, non mostra il banner
      }
    };
    fetchCityImage();
  }, [weather, UNSPLASH_KEY]);

  if (loading) {
    return (
      <div className="detail-page text-center">
        <div className="loading-spinner"></div>
        <p className="mt-3 loading-text">
          Caricamento dati meteo per {decodeURIComponent(city)}...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page text-center">
        <div className="error-container">
          <div className="error-icon">🌧️</div>
          <h2>{error}</h2>
          <Link to="/search" className="back-link">
            ← Torna alla ricerca
          </Link>
        </div>
      </div>
    );
  }

  const weatherMain = weather.weather[0].main.toLowerCase();
  const weatherIcon = weather.weather[0].icon;
  const isNight = weatherIcon.includes("n");

  let weatherTypeClass = "weather-clear";
  if (weatherMain.includes("cloud")) weatherTypeClass = "weather-clouds";
  else if (weatherMain.includes("rain") || weatherMain.includes("drizzle"))
    weatherTypeClass = "weather-rain";
  else if (weatherMain.includes("snow")) weatherTypeClass = "weather-snow";
  else if (weatherMain.includes("thunder"))
    weatherTypeClass = "weather-thunderstorm";
  else if (
    weatherMain.includes("mist") ||
    weatherMain.includes("fog") ||
    weatherMain.includes("haze")
  )
    weatherTypeClass = "weather-mist";

  const pageClassName = `detail-page ${weatherTypeClass}${isNight ? " weather-night" : ""}`;

  return (
    <div className={pageClassName}>
      {/* Sfondo decorativo illustrato */}
      <div className="weather-bg" aria-hidden="true">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
        <div className="bg-decoration">
          {weatherTypeClass === "weather-clear" && !isNight && (
            <>
              <div className="deco-sun"></div>
              <div className="deco-cloud-mini"></div>
              <div className="deco-hill deco-hill-1"></div>
              <div className="deco-hill deco-hill-2"></div>
            </>
          )}
          {weatherTypeClass === "weather-clouds" && (
            <>
              <div className="deco-cloud deco-cloud-lg"></div>
              <div className="deco-cloud deco-cloud-md"></div>
              <div className="deco-cloud deco-cloud-sm"></div>
            </>
          )}
          {weatherTypeClass === "weather-rain" && (
            <>
              <div className="deco-cloud deco-cloud-lg"></div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="deco-rain-drop"
                  style={{
                    left: `${10 + i * 11}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                ></div>
              ))}
            </>
          )}
          {weatherTypeClass === "weather-snow" && (
            <>
              <div className="deco-cloud deco-cloud-md"></div>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="deco-snowflake"
                  style={{
                    left: `${5 + i * 10}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + (i % 3) * 0.7}s`,
                  }}
                ></div>
              ))}
            </>
          )}
          {weatherTypeClass === "weather-thunderstorm" && (
            <>
              <div
                className="deco-cloud deco-cloud-lg"
                style={{ opacity: "0.7" }}
              ></div>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="deco-lightning"
                  style={{
                    left: `${15 + i * 25}%`,
                    animationDelay: `${i * 1.2}s`,
                  }}
                >
                  ⚡
                </div>
              ))}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="deco-rain-drop"
                  style={{
                    left: `${8 + i * 15}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                ></div>
              ))}
            </>
          )}
          {weatherTypeClass === "weather-mist" && (
            <>
              <div className="deco-mist deco-mist-1"></div>
              <div className="deco-mist deco-mist-2"></div>
              <div className="deco-mist deco-mist-3"></div>
            </>
          )}
          {isNight && (
            <>
              <div className="deco-moon"></div>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="deco-star"
                  style={{
                    top: `${8 + i * 12}%`,
                    left: `${60 + ((i * 6) % 35)}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="detail-container">
        {/* Banner immagine città da Unsplash */}
        {cityImage && (
          <div className="city-banner">
            <img
              src={cityImage}
              alt={weather.name}
              className="city-banner-img"
            />
            <div className="city-banner-overlay"></div>
          </div>
        )}

        {/* Card principale */}
        <div className="weather-card glass">
          <div className="weather-header">
            <div className="city-badge">{country || weather.sys.country}</div>
            <h1>{decodeURIComponent(city)}</h1>
            <p className="weather-description">
              {weather.weather[0].description}
            </p>
          </div>

          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <div className="temperature">
              <span className="temp-value">
                {Math.round(weather.main.temp)}
              </span>
              <span className="temp-unit">°C</span>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-icon">🌡️</span>
              <span className="detail-label">Percepita</span>
              <span className="detail-value">
                {Math.round(weather.main.feels_like)}°C
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <span className="detail-label">Umidità</span>
              <span className="detail-value">{weather.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💨</span>
              <span className="detail-label">Vento</span>
              <span className="detail-value">
                {Math.round(weather.wind.speed * 3.6)} km/h
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📊</span>
              <span className="detail-label">Pressione</span>
              <span className="detail-value">{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>

        {/* Sezione previsioni */}
        <div className="forecast-section">
          <h2>Previsioni</h2>
          <div className="forecast-grid">
            {forecast.list
              .filter((item) => item.dt_txt.includes("12:00:00"))
              .slice(0, 5)
              .map((day) => (
                <div key={day.dt} className="forecast-card glass">
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

        {/* Link per tornare */}
        <div className="back-section">
          <Link to="/search" className="back-link-secondary">
            ← Cerca un&#39;altra città
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
