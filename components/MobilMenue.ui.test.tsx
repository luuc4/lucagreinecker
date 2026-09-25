import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MobilMenue } from "./MobilMenue";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

const EINTRAEGE = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/kontakt", label: "Kontakt" },
];

it("öffnet mit dem Knopf und meldet den Zustand über aria-expanded", () => {
  render(<MobilMenue eintraege={EINTRAEGE} />);
  const knopf = screen.getByRole("button", { name: "Menü" });
  expect(knopf.getAttribute("aria-expanded")).toBe("false");
  expect(screen.queryByRole("link", { name: "Kontakt" })).toBeNull();

  fireEvent.click(knopf);
  expect(knopf.getAttribute("aria-expanded")).toBe("true");
  expect(knopf.textContent).toBe("Schließen");
  expect(screen.getByRole("link", { name: "Kontakt" })).toBeTruthy();
});

it("schließt mit Escape und gibt den Fokus an den Knopf zurück", () => {
  render(<MobilMenue eintraege={EINTRAEGE} />);
  const knopf = screen.getByRole("button", { name: "Menü" });
  fireEvent.click(knopf);
  screen.getByRole("link", { name: "Leistungen" }).focus();

  fireEvent.keyDown(window, { key: "Escape" });
  expect(knopf.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(knopf);
});
