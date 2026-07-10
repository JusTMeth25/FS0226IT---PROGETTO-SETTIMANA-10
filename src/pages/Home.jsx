import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-page text-center">
        <div className="mt-5 mb-5">
          <h1>🌤️ Benvenuto su EpiWeather</h1>
          <p
            className="mt-3 mb-4"
            style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}
          >
            Scopri le condizioni meteo di qualsiasi città nel mondo! Cerca una
            città e visualizza temperatura, umidità, vento e previsioni dei
            prossimi giorni.
          </p>
        </div>
      </div>

      <div className="features mt-5">
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Città di tutto il mondo</h3>
          <p>Cerca qualsiasi città e ottieni informazioni meteo aggiornate.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌡️</div>
          <h3>Dettagli completi</h3>
          <p>Temperatura, umidità, velocità del vento e molto altro.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Previsioni giornaliere</h3>
          <p>Visualizza le previsioni per i prossimi giorni.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
