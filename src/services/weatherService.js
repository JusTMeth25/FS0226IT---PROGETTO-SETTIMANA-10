const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

/**
 * Cerca città con la Geocoding API
 * Restituisce un array di risultati con { name, country, lat, lon, state? }
 */
export const searchCity = async (query) => {
  const response = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Errore nella ricerca della città");
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error(`Città "${query}" non trovata`);
  }

  return data;
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  const response = await fetch(
    `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`
  );

  if (!response.ok) {
    throw new Error("Errore nel recupero dei dati meteo");
  }

  return response.json();
};

export const getForecastByCoords = async (lat, lon) => {
  const response = await fetch(
    `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`
  );

  if (!response.ok) {
    throw new Error("Errore nel recupero delle previsioni");
  }

  return response.json();
};

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`,
  );

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? `Città "${city}" non trovata `
        : "Errore nel recupero dei dati meteo",
    );
  }

  return response.json();
};

export const getForecast = async (city) => {
  const response = await fetch(
    `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=it`,
  );

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? `Città "${city}" non trovata `
        : "Errore nel recupero delle previsioni",
    );
  }

  return response.json();
};


