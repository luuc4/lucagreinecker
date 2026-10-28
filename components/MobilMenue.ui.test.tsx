import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MobilMenue } from "./MobilMenue";

vi.mock("@/i18n/navigation", async () => {
  const { default: Link } = await import("next/link");
  return { Link, usePathname: () => "/" };
});

const EINTRAEGE = [
  {
    eintrag: { pfad: "/ueber-mich" as const, label: "ueberMich" as const },
    label: "Über mich",
  },
  {
    eintrag: { pfad: "/kontakt" as const, label: "projekte" as const },
    label: "Kontakt",
  },
];
const TEXTE = { menue: "Menü", schliessen: "Schließen" };

it("öffnet mit dem Knopf und meldet den Zustand über aria-expanded", () => {
  render(<MobilMenue eintraege={EINTRAEGE} texte={TEXTE} />);
  const knopf = screen.getByRole("button", { name: "Menü" });
  expect(knopf.getAttribute("aria-expanded")).toBe("false");
  expect(screen.queryByRole("link", { name: "Kontakt" })).toBeNull();

  fireEvent.click(knopf);
  expect(knopf.getAttribute("aria-expanded")).toBe("true");
  expect(knopf.textContent).toBe("Schließen");
  expect(screen.getByRole("link", { name: "Kontakt" })).toBeTruthy();
});

it("schließt mit Escape und gibt den Fokus an den Knopf zurück", () => {
  render(<MobilMenue eintraege={EINTRAEGE} texte={TEXTE} />);
  const knopf = screen.getByRole("button", { name: "Menü" });
  fireEvent.click(knopf);
  screen.getByRole("link", { name: "Über mich" }).focus();

  fireEvent.keyDown(window, { key: "Escape" });
  expect(knopf.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(knopf);
});

it("zeigt den Zusatz (Sprachlink) als letzten Eintrag", () => {
  render(
    <MobilMenue
      eintraege={EINTRAEGE}
      texte={TEXTE}
      zusatz={<span lang="en">English</span>}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Menü" }));
  const eintraege = screen.getAllByRole("listitem");
  expect(eintraege.at(-1)?.textContent).toBe("English");
});
