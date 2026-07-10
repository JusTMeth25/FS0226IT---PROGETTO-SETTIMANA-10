import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navigation";
import { describe, test, expect } from "vitest";

const renderNavbar = () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Navbar Component", () => {
  test("renderizza il logo EpiWeather", () => {
    renderNavbar();
    const logo = screen.getByText(/EpiWeather/i);
    expect(logo).toBeInTheDocument();
  });

  test("renderizza il link Home", () => {
    renderNavbar();
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  test("renderizza il link Ricerca", () => {
    renderNavbar();
    const searchLink = screen.getByText("Ricerca");
    expect(searchLink).toBeInTheDocument();
    expect(searchLink.closest("a")).toHaveAttribute("href", "/search");
  });
});
