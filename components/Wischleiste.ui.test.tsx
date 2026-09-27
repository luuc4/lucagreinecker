import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Wischleiste } from "./Wischleiste";

// jsdom kennt keinen IntersectionObserver: dieser merkt sich den Rückruf,
// damit der Test melden kann, welche Einträge im Blick sind.
let melden: IntersectionObserverCallback = () => {};

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(rueckruf: IntersectionObserverCallback) {
        melden = rueckruf;
      }
      observe() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function striche(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>("[aria-hidden] span"),
    (s) => s.classList.contains("bg-fg"),
  );
}

function pfeilZurueck(container: HTMLElement) {
  return container.querySelector("svg")!.classList.contains("rotate-180");
}

it("zeigt einen Strich je Projekt, zu Beginn das erste im Blick", () => {
  const { container, getByText } = render(
    <Wischleiste>
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
    </Wischleiste>,
  );
  expect(striche(container)).toEqual([true, false, false, false]);
  expect(getByText("Wischen").closest("[aria-hidden]")).toBeTruthy();
});

it("folgt beim Wischen den Projekten, die zu mehr als der Hälfte sichtbar sind", () => {
  const { container, getByText } = render(
    <Wischleiste>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </Wischleiste>,
  );
  const meldung = (text: string, intersectionRatio: number) =>
    ({ target: getByText(text), intersectionRatio }) as never;

  act(() => melden([meldung("A", 0.3), meldung("B", 0.9)], {} as never));
  expect(striche(container)).toEqual([false, true, false]);

  // Nur ein Rand vom dritten: bleibt aus.
  act(() => melden([meldung("C", 0.25)], {} as never));
  expect(striche(container)).toEqual([false, true, false]);
  expect(pfeilZurueck(container)).toBe(false);

  // Am Ende zeigt der Pfeil zurück.
  act(() => melden([meldung("B", 0.3), meldung("C", 1)], {} as never));
  expect(striche(container)).toEqual([false, false, true]);
  expect(pfeilZurueck(container)).toBe(true);
});
