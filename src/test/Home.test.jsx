import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import Home from "../pages/Home";

const renderHome = () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("Home Page", () => {
  test("renderizza il titolo di benvenuto", () => {
    renderHome();
    const title = screen.getByText(/Benvenuto su EpiWeather/i);
    expect(title).toBeInTheDocument();
  });

  test("renderizza le tre feature card", () => {
    renderHome();
    expect(screen.getByText("Città di tutto il mondo")).toBeInTheDocument();
    expect(screen.getByText("Dettagli completi")).toBeInTheDocument();
    expect(screen.getByText("Previsioni giornaliere")).toBeInTheDocument();
  });
});
