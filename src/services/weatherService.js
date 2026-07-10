const API_KEY = "ef95724cd9a4bbe118d34c72dc1d6a83";
const API_URL = "https://api.openweathermap.org/data/2.5";

// utilizzo export cosi e' disponibile anche all'esterno, posso importarla in altri file che mi servono quali ad es. Search, Detail
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

// Previsioni per 5 giorni (ogni 3 ore) per una città

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


