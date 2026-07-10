import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>🌤️ MeteoApp - Powered by OpenWeatherMap API</p>
        <p>&copy; {new Date().getFullYear()} - Tutti i diritti riservati</p>
      </div>
    </footer>
  );
};

export default Footer;
