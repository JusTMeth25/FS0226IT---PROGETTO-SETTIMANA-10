import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:city" element={<Detail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
