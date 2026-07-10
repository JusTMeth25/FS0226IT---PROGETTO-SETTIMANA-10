import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "../pages/Search";
import { describe, test, expect } from "vitest";
import { vi } from "vitest";
import { beforeEach } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../services/weatherService", () => ({
  searchCity: vi.fn(() => Promise.reject(new Error("Città non trovata"))),
}));

const renderSearch = () => {
  render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>,
  );
};

describe("Search Page", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renderizza il titolo e il form di ricerca", () => {
    renderSearch();
    expect(screen.getByText(/Cerca una città/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/es. Roma, Catanzaro, Napoli, Londra/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cerca/i })).toBeInTheDocument();
  });

  test("mostra alert se si cerca con campo vuoto", () => {
    renderSearch();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const button = screen.getByRole("button", { name: /cerca/i });
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalledWith("Inserisci il nome di una città");
    alertMock.mockRestore();
  });
});
